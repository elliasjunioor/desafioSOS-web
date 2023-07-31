import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpApiClient} from './http-api-client.service';
import {environment} from '../../environments/environment';


export interface ApiService<T> {
  controllerUrl: (string);

  getControllerUrl?(): string;

  getInMemoryCollection?(): string;

  setBaseUrl(url: string): void;

  setApiUrl(url: string): void;

  init?(): void;

  findById(id: any, url: string): Observable<T>;

  items(url: string): Observable<T[]>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  controllerUrl = 'http://localhost:8080';
  private readonly httpClient: HttpApiClient<T>;

  constructor(http: HttpApiClient<T>) {
    this.controllerUrl = this.getControllerUrl ? this.getControllerUrl() : '';
    this.httpClient = http;
    if (this.init) {
      this.init();
    }
    this.setBaseUrl();
    if (environment.mockData && this.getInMemoryCollection) {
      this.httpClient.inMemoryCollection = this.getInMemoryCollection();
    }
  }

  get http(): HttpApiClient<T> {
    this.httpClient.controllerUrl = this.controllerUrl;
    return this.httpClient;
  }

  setBaseUrl(url?: string): void {
    this.http.apiUrl = url || environment.apiUrl;
    this.http.controllerUrl = this.controllerUrl;
  }

  getControllerUrl?(): string;

  getInMemoryCollection?(): string;


}
