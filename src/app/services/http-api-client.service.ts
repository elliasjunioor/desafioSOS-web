import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from "lodash";
import {environment} from '../../environments/environment';

@Injectable()
export class HttpApiClient<T> extends HttpClient {

  apiUrl: string;
  controllerUrl: string;
  inMemoryCollection: string;

  prepareUrl(url: string): string {
    return this.apiUrl + this.controllerUrl + url;
  }


  override get<T>(url: string, options?: any): Observable<any | T | T[]> {
    url = this.prepareUrl(url);
    options = this.prepareForInMemory(options);
    return super.get<T>(url, options);
  }

  override post(url: string, body: any = {}, options?: any): Observable<any> {
    url = this.prepareUrl(url);
    return super.post(url, body, options);
  }

  override patch(url: string, body: any = {}, options?: any): Observable<any> {
    url = this.prepareUrl(url);
    return super.patch(url, body, options);
  }

  override put(url: string, body: any = {}, options?: any): Observable<any> {
    url = this.prepareUrl(url);
    return super.put(url, body, options);
  }

  override delete(url: string, options?: any): Observable<any> {
    url = this.prepareUrl(url);
    return super.delete(url, options);
  }

  override options(url: string, options?: any): Observable<any> {
    url = this.prepareUrl(url);
    return super.options(url, options);
  }

  override head(url: string, options?: any): Observable<any> {
    url = this.prepareUrl(url);
    return super.head(url, options);
  }

  override jsonp(url: string, callbackParam: string): Observable<any> {
    url = this.prepareUrl(url);
    return super.jsonp(url, callbackParam);
  }


  prepareForInMemory(options?: any): any {
    if (environment.mockData && this.inMemoryCollection) {
      return _.merge(options || {}, {
        headers: {inMemoryCollection: this.inMemoryCollection},
      });
    }
    return options;
  }

}

