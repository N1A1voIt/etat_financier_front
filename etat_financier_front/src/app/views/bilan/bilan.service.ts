import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../../environnements/env";

@Injectable({
  providedIn: 'root'
})
export class BilanService {
  apiUrl:string = apiUrl();
  constructor(private http:HttpClient) { }
  getBilan(json:any){
    return this.http.get<any>(`${this.apiUrl}/api/bilan?annee=${json.idAnnee}&entreprise=${json.idEntreprise}`);
  }
}
