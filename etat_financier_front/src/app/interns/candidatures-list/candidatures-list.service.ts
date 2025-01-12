import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class CandidaturesListService {
  apiUrl = apiUrl();
  constructor(private http:HttpClient) { }
  getCandidatures(id:any){
    return this.http.get<any>(`${this.apiUrl}postes_candidats/${id}`)
  }
  getCv(id:any){
    return this.http.get<any>(`${this.apiUrl}candidats_details/${id}`)
  }
}
