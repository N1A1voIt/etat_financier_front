import { Injectable } from '@angular/core';
import {apiUrl} from "../../../../environnements/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompteResultatService {
  apiUrl:string = apiUrl();
  constructor(private http: HttpClient) { }
  save(json:any) {
    return this.http.post(`${this.apiUrl}/api/financial-data`, json);
  }
  getFinancialDataByYear(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/financial-data/2024`);
  }
}
