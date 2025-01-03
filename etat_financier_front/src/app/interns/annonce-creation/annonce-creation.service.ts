import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class AnnonceCreationService {
  apiUrl = apiUrl()
  constructor(private http:HttpClient) { }
  save(json:any){
    return this.http.post<any>(`${this.apiUrl}postes`,json);
  }
}
