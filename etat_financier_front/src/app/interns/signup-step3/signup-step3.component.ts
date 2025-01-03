import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { CommonModule } from '@angular/common';
import { SignupService } from '../signup/signup.service';
import { IndexComponent } from '../../views/index/index.component';
import { SelectRoundedComponent } from '../../atoms/select-rounded/select-rounded.component';
import { response } from 'express';

@Component({
  selector: 'app-signup-step3',
  standalone: true,
  imports: [SubmitButtonComponent, InputControlComponent,ReactiveFormsModule,CommonModule,SelectRoundedComponent],
  templateUrl: './signup-step3.component.html',
  styleUrl: './signup-step3.component.css'
})
export class SignupStep3Component {
  @Input() assets:any;
  form3:FormGroup;
  constructor(private fb:FormBuilder,private suc:SignupService,private index:IndexComponent ){
    this.form3 = this.fb.group({
      diplomes:this.fb.array([])
    })
  }
  onSubmit(){
    this.suc.updateFormData("step3",this.form3.value)
    console.log(this.suc.getCompleteData())
    this.index.currentStep = 3
    this.suc.inscrire(this.suc.getCompleteData()).subscribe({
      next:(response)=>{
        console.log(response);
        alert(response.message)
        // localStorage.setItem("userToken",response.headers.get("Authorization"));
      }
    })
  }
  addDiploma(){
    const diplomaGroup = this.fb.group({
      domaineId:[""],
      niveau:[""],
      dateObtention:[""]
    })
    this.diplomes.push(diplomaGroup)
    console.log("Adding")
  }
  get diplomes():FormArray{
    return this.form3.get("diplomes") as FormArray
  } 
}
