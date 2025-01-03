import { Component } from '@angular/core';
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [InputControlComponent, SubmitButtonComponent,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formGroup:FormGroup;
  constructor(private fb:FormBuilder,private service:SigninService,private router:Router) {
    this.formGroup = this.fb.group({
      email:[""],
      motDePasse:[""]
    })
  }
  onSubmit(){
    this.service.signin(this.formGroup.value).subscribe({
      next:(response)=>{
        console.log(response)
        //@ts-ignore
          localStorage.setItem("userToken",response.headers.get("Authorization"));
          if(response.body.admin == true) this.router.navigateByUrl("/admin");
          if(response.body.admin == false) this.router.navigateByUrl("/profil");
          console.log("logged")
      },error:(error)=>{
        alert(error)
      }
    })
  }
}
