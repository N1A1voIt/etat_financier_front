import { Injectable } from '@angular/core';
import { apiUrl } from '../../../environnements/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlterProfilService {
  apiUrl = apiUrl()
  constructor(private http:HttpClient) { }
  updateXp(json:any){
    console.log(json)
    const token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      //@ts-ignore
      'Authorization':token
    });
    return this.http.post<any>(`${this.apiUrl}candidats`,json, { headers: headers })
  }
}
