import { Component, Input } from '@angular/core';
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { IndexComponent } from '../../views/index/index.component';
import { SignupService } from '../signup/signup.service';
import { ButtonComponent } from "../../atoms/button/button.component";
import { SelectRoundedComponent } from "../../atoms/select-rounded/select-rounded.component";

@Component({
  selector: 'app-signup-step2',
  standalone: true,
  imports: [InputControlComponent, SubmitButtonComponent, ReactiveFormsModule, CommonModule, ButtonComponent, SelectRoundedComponent],
  templateUrl: './signup-step2.component.html',
  styleUrl: './signup-step2.component.css'
})
export class SignupStep2Component {
  @Input() assets:any;
  form2:FormGroup;
  constructor(private fb:FormBuilder,private suc:SignupService,private index:IndexComponent ){
    this.form2 = this.fb.group({
      experiences:this.fb.array([])
    })
  }
  onSubmit(){
    this.suc.updateFormData("step2",this.form2.value)
    this.index.currentStep = 3
  }
  addXp(){
    const xpGroup = this.fb.group({
      domaineId:[""],
      titrePoste:[""],
      entreprise:[""],
      description:[""],
      dateDebut:[""],
      dateFin:[""],
    })
    this.experiences.push(xpGroup)
    console.log("Adding")
  }
  get experiences():FormArray{
    return this.form2.get("experiences") as FormArray
  } 
}
