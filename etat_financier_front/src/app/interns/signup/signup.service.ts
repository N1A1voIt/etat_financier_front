import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { apiUrl } from '../../../environnements/env';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  apiUrl = apiUrl();
  private formData = new BehaviorSubject<any>({
    step1: {},
    step2: {},
    step3: {},
  });
  constructor(private http:HttpClient) { }
  currentData = this.formData.asObservable();
  inscrire(json:any){
    return this.http.post<any>(`${this.apiUrl}inscription`,json);
  }
  updateFormData(step: string, data: any) {
    const current = this.formData.value;
    current[step] = { ...current[step], ...data };
    this.formData.next(current);
  }

  getCompleteData() {
    return {
      ...this.formData.value.step1,
      ...this.formData.value.step2,
      ...this.formData.value.step3,
    };
  }
}
