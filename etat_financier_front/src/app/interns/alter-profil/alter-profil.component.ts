import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputDSquareComponent } from "../../atoms/input-d-square/input-d-square.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlterProfilService } from './alter-profil.service';

@Component({
  selector: 'app-alter-profil',
  standalone: true,
  imports: [InputDSquareComponent, SubmitButtonComponent,ReactiveFormsModule],
  templateUrl: './alter-profil.component.html',
  styleUrl: './alter-profil.component.css'
})
export class AlterProfilComponent implements OnChanges {
  @Input() disabled: boolean = false;
  @Input() profil: any;
  
  formGroup: FormGroup;

  constructor(private fbn: FormBuilder,private aps:AlterProfilService) {
    // Initialize form with empty values
    this.formGroup = this.fbn.group({
      nom: [""],
      prenom: [""],
      email: [""],
      motDePasse: [""]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if 'profil' input has changed
    if (changes['profil'] && this.profil) {
      console.log('Profil has changed:', this.profil);  // Log profil when it changes
      this.setFormGroupValues();
    }
  }

  setFormGroupValues(): void {
    // Populate form fields with 'profil' data
    if (this.profil) {
      this.formGroup.patchValue({
        nom: this.profil.nom || "",
        prenom: this.profil.prenom || "",
        email: this.profil.email || "",
        motDePasse: this.profil.motDePasse || ""
      });
    }
  }
  onSubmit(){
    this.aps.updateXp(this.formGroup.value).toPromise();
  }
}