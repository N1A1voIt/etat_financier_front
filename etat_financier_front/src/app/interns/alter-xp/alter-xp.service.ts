import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class AlterXpService {
  apiUrl = apiUrl()
  constructor(private http:HttpClient) { }
  updateXp(json:any){
    const token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      //@ts-ignore
      'Authorization':token
    });
    return this.http.post<any>(`${this.apiUrl}experiences/update`,json, { headers: headers })
  }
}
