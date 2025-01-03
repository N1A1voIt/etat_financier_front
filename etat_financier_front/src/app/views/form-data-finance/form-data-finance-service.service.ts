import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../../environnements/env";

@Injectable({
  providedIn: 'root'
})
export class FormDataFinanceService {
  apiUrl: string = apiUrl();
  constructor(private http:HttpClient) { }
  saveFinancialData(json:any){
    console.log(json);
    return this.http.post<any>(`${this.apiUrl}/api/finance-form`, json);
  }
  saveCompteResultatData(json:any){
    console.log(json);
    return this.http.post<any>(`${this.apiUrl}/api/compte-resultat`, json);
  }
  enterpriseYear(){
    return this.http.get<any>(`${this.apiUrl}/api/yearCorp`);
  }
}
