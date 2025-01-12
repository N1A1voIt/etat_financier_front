import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  apiUrl: string = apiUrl();
  constructor(private http:HttpClient) { }
  getFinancialData(json:any){
    return this.http.post<any>(`${this.apiUrl}/api/compte-resultat-year`, json);
  }
}
