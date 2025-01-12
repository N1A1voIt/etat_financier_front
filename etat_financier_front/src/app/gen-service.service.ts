import { Injectable } from '@angular/core';
import { apiUrl, imagesRoute } from '../environnements/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenServiceService {
  apiUrl:string = apiUrl()
  apiUrl2:string = imagesRoute()
  constructor(private http:HttpClient) { }
  makeAction(actionName:string,link:string,id:number|undefined,form:any):Observable<any>{
    if(actionName === 'GETALL' ){
      return this.http.get<any>(`${this.apiUrl}${link}`);
    }
    if(actionName === 'DELETE' ){
      return this.http.delete<any>(`${this.apiUrl}${link}/${id}`);
    }if(actionName === 'POST'){
      console.log(`${this.apiUrl}${link}/save`)
      return this.http.post(`${this.apiUrl}${link}/save`,form);   
    }
    throw new Error("What the heck")
  }
  dropDown(link:string):Observable<any>{
      return this.http.get<any>(`${this.apiUrl2}${link}`);
  }
}
