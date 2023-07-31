import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends ApiService<any>{

  override getControllerUrl(): string {
    return '/marca';
  }

  findAll(): Observable<any> {
    return this.http.get('/list-all');
  }

  override findById(id: string): Observable<any> {
    return this.http.get('', {params: {id}});
  }

  save(marca: any): Observable<any> {
    return this.http.post('', marca);
  }

  update(marca: any): Observable<any> {
    return this.http.put('', marca);
  }

  delete(id: string): Observable<any> {
    return this.http.delete('', {params: {id}});
  }

  upload(dados: any, id: string): Observable<any> {
    console.log(dados)
    const formData = new FormData();
    formData.append('file', dados.file);
    return this.http.post('/uploadFile', formData, {resposeType: 'text', params: {
        id: id
      }});
  }

  download(nomeArquivo: string, id: string): Observable<any> {
    console.log(nomeArquivo);
    return this.http.get('/downloadFile/', {responseType: 'arraybuffer', params: {
        filename: nomeArquivo,
        id: id
      }});
  }
}
