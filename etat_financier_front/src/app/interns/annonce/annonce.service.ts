import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  apiUrl = apiUrl();
  constructor(private http:HttpClient) { }
  posteById(id:any){
    return this.http.get<any>(`${this.apiUrl}postes/${id}`);
  }
}
