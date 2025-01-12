import { Component } from '@angular/core';
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { GenServiceService } from '../../gen-service.service';
import { SelectRoundedComponent } from '../../atoms/select-rounded/select-rounded.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnnonceCreationService } from './annonce-creation.service';

@Component({
  selector: 'app-annonce-creation',
  standalone: true,
  imports: [InputControlComponent, SubmitButtonComponent,SelectRoundedComponent,ReactiveFormsModule],
  templateUrl: './annonce-creation.component.html',
  styleUrl: './annonce-creation.component.css'
})
export class AnnonceCreationComponent {
  assets:any;
  poste:FormGroup
  constructor(private gs:GenServiceService,private fb:FormBuilder,private as:AnnonceCreationService) {
    this.poste = fb.group({
      titre:[""],
      description:[""],
      qualifications:[""],
      domaineId:[""],
      experienceRequise:[""],
      dateCreation:[""]
    })
  }

  ngOnInit(): void {
    this.gs.dropDown("su-assets").subscribe({
      next: (resposse) => {
        this.assets = resposse;
        console.log(this.assets);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  async onSubmit(){
    await this.as.save(this.poste.value).toPromise();
  }
}
