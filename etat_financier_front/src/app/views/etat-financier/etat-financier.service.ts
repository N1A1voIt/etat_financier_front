import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../../environnements/env";

@Injectable({
  providedIn: 'root'
})
export class EtatFinancierService {
  apiUrl:string = apiUrl();
  constructor(private http:HttpClient) { }
  getRatios(json:any){
    return this.http.post<any>(`${this.apiUrl}/api/indicateurs`, json);
  }
}
