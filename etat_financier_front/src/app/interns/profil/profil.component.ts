import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { InputDSquareComponent } from "../../atoms/input-d-square/input-d-square.component";
import { SigninComponent } from "../signin/signin.component";
import { SignupStep2Component } from "../signup-step2/signup-step2.component";
import { AlterXpComponent } from "../alter-xp/alter-xp.component";
import { AlterDiplomaComponent } from "../alter-diploma/alter-diploma.component";
import { AlterProfilComponent } from "../alter-profil/alter-profil.component";
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [InputControlComponent, SubmitButtonComponent, InputDSquareComponent, SigninComponent, SignupStep2Component, AlterXpComponent, AlterDiplomaComponent, AlterProfilComponent,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  disabled:boolean = false;
  data:any;
  constructor(private appService:AppService) {
    
  }
  async ngOnInit(): Promise<void> {
    //@ts-ignore
    this.data = await this.appService.retrieveMyProfile(localStorage.getItem("userToken")).toPromise()
    console.log(this.data)
  }
}
