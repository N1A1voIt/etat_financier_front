import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl, imagesRoute} from "../environnements/env";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl:string = apiUrl();
  constructor(private http:HttpClient) { }
  retrieveMyProfile(token: string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':token
    });
    return this.http.get<any>(`${this.apiUrl}my-profile`, { headers: headers });
  }
}
