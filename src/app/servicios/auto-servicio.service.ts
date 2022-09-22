import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iauto } from '../modelos/iauto';

@Injectable({
  providedIn: 'root'
})

export class AutoServicioService {
  private baseApiUrl = "https://6327e8e35731f3db99603ccf.mockapi.io/api/concesionario/Auto/";

  constructor(private httpClient: HttpClient) {}

  getAutos() : Observable<any> {
    return this.httpClient.get(this.baseApiUrl);
  }

  getAuto(id: number) : Observable<any> { 
    return this.httpClient.get(this.baseApiUrl+id);
  }

  addAuto(auto: Iauto) : Observable<any> {
    return this.httpClient.post(this.baseApiUrl,auto);
  }

  updateAuto(auto: Iauto) : Observable<any> {
    return this.httpClient.put(this.baseApiUrl+auto.id, auto);
  }

  deleteAuto(id: number) : Observable<any> {
    return this.httpClient.delete(this.baseApiUrl+id);
  }
}
