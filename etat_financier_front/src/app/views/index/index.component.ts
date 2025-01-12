import { Component, OnInit } from '@angular/core';
import { FormTemplateComponent } from "../../../reusable/form-template/form-template.component";
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { SigninComponent } from "../../interns/signin/signin.component";
import { SignupComponent } from "../../interns/signup/signup.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupStep2Component } from "../../interns/signup-step2/signup-step2.component";
import { SignupStep3Component } from "../../interns/signup-step3/signup-step3.component";
import { GenServiceService } from '../../gen-service.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormTemplateComponent, InputControlComponent, SubmitButtonComponent, SigninComponent, SignupComponent, CommonModule, SignupStep2Component, SignupStep3Component],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  isSignUp:boolean = false;
  currentStep:number=1;
  assets:any;
  constructor(private router:Router,private gs:GenServiceService) {
  }
  ngOnInit(): void {
    console.log(this.router.url)
    if(this.router.url === "/signup") this.isSignUp = true;
    this.gs.dropDown("su-assets").subscribe({
      next:(resposse)=>{
        this.assets = resposse
        console.log(this.assets)
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
