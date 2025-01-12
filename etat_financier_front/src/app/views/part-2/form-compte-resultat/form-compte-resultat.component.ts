import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputDSquareComponent} from "../../../atoms/input-d-square/input-d-square.component";
import {JsonPipe, NgIf} from "@angular/common";
import {CompteResultatService} from "../services/compte-resultat.service";

@Component({
  selector: 'app-form-compte-resultat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputDSquareComponent,
    NgIf,
    JsonPipe
  ],
  templateUrl: './form-compte-resultat.component.html',
  styleUrl: './form-compte-resultat.component.css'
})
export class FormCompteResultatComponent implements OnInit {
  currentStep: number = 1;

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  step5Form: FormGroup;

  constructor(private fb: FormBuilder,private cdr:CompteResultatService) {
    this.step1Form = this.fb.group({
      ca: [null, [Validators.required, Validators.min(0)]], // Chiffre d'affaires
      ps: [null, [Validators.min(0)]], // Production stockée
      pi: [null, [Validators.min(0)]], // Production immobilisée
    });

    this.step2Form = this.fb.group({
      ac: [null, [Validators.required, Validators.min(0)]], // Achats consommés
      se: [null, [Validators.min(0)]], // Services extérieurs
    });

    this.step3Form = this.fb.group({
      cp: [null, [Validators.required, Validators.min(0)]], // Charges de personnel
      it: [null, [Validators.min(0)]], // Impôts, taxes
      ao: [null, [Validators.min(0)]], // Autres produits opérationnels
      co: [null, [Validators.min(0)]], // Autres charges opérationnels
      dp: [null, [Validators.min(0)]], // Dotations aux amortissements
      rp: [null, [Validators.min(0)]], // Reprises aux provisions et aux pertes de valeurs
    });

    this.step4Form = this.fb.group({
      pf: [null, [Validators.min(0)]], // Produits financiers
      cf: [null, [Validators.min(0)]], // Charges financières
    });

    this.step5Form = this.fb.group({
      ie: [null, [Validators.min(0)]], // Impôts exigibles sur résultat
      id: [null, [Validators.min(0)]], // Impôts différés
      ep: [null, [Validators.min(0)]], // Produits exceptionnels
      ec: [null, [Validators.min(0)]], // Charges exceptionnelles
    });

  }

  ngOnInit(): void {
    this.cdr.getFinancialDataByYear().subscribe(
        (data: any) => {
          this.patchFormValues(data);
        },
        (error: any) => {
          console.error('Error fetching financial data:', error);
        }
    );
  }

  patchFormValues(data: any) {
    this.step1Form.patchValue({
      ca: data.ca,
      ps: data.ps,
      pi: data.pi,
    });

    this.step2Form.patchValue({
      ac: data.ac,
      se: data.se,
    });

    this.step3Form.patchValue({
      cp: data.cp,
      it: data.it,
      ao: data.ao,
      co: data.co,
      dp: data.dp,
      rp: data.rp,
    });

    this.step4Form.patchValue({
      pf: data.pf,
      cf: data.cf,
    });

    this.step5Form.patchValue({
      ie: data.ie,
      id: data.id,
      ep: data.ep,
      ec: data.ec,
    });
  }

  goToNextStep() {
    if (this.currentStep < 7) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getAllFormData() {
    return {
      ...this.step1Form.value,
      ...this.step2Form.value,
      ...this.step3Form.value,
      ...this.step4Form.value,
      ...this.step5Form.value,
    };
  }

  onSubmit() {
    if (
        this.step1Form.valid &&
        this.step2Form.valid &&
        this.step3Form.valid &&
        this.step4Form.valid &&
        this.step5Form.valid
    ) {
      console.log("Formulaire soumis avec succès :", this.getAllFormData());
      this.cdr.save(this.getAllFormData()).subscribe({
        next:(response: any) => {
          console.log(response);
        },error:(error: any) => {
          alert(error);
        }
      })
    } else {
      console.error("Veuillez remplir correctement toutes les étapes.");
    }
  }
}
