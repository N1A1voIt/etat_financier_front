import { Injectable } from '@angular/core';
import {apiUrl} from "../../../../environnements/env";
import {HttpClient} from "@angular/common/http";
import {Rubrique} from "../../../rubrique.model";
import {response} from "express";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RubriquesService {
  apiUrl:string = apiUrl();
  constructor(private http:HttpClient) { }
  getRubriques():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/rubriques`);
  }
  save(rubrique:Rubrique): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/rubriques`, rubrique);
  }
}
