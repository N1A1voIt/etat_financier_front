import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  apiUrl = apiUrl();
  constructor(private http:HttpClient) { }
  signin(json:any){
    return this.http.post<any>(`${this.apiUrl}connexion`,json,{observe:'response'})
  }
}
