import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputDSquareComponent} from "../../../atoms/input-d-square/input-d-square.component";
import {JsonPipe, NgIf} from "@angular/common";

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
export class FormCompteResultatComponent {
  currentStep: number = 1;

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  step5Form: FormGroup;
  step6Form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      chiffreAffaires: [null, [Validators.required, Validators.min(0)]],
      productionStockee: [null, [Validators.min(0)]],
      productionImmobilisee: [null, [Validators.min(0)]]
    });

    this.step2Form = this.fb.group({
      achatsConsommes: [null, [Validators.required, Validators.min(0)]],
      servicesExterieurs: [null, [Validators.min(0)]]
    });

    this.step3Form = this.fb.group({
      chargesPersonnel: [null, [Validators.required, Validators.min(0)]],
      impotsTaxes: [null, [Validators.min(0)]]
    });

    this.step4Form = this.fb.group({
      produitsFinanciers: [null, [Validators.min(0)]],
      chargesFinancieres: [null, [Validators.min(0)]]
    });

    this.step5Form = this.fb.group({
      produitsExceptionnels: [null, [Validators.min(0)]],
      chargesExceptionnelles: [null, [Validators.min(0)]]
    });

    this.step6Form = this.fb.group({
      partResultatsEquivalence: [null, [Validators.min(0)]],
      partMinoritaire: [null, [Validators.min(0)]]
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
      ...this.step6Form.value
    };
  }

  onSubmit() {
    if (
        this.step1Form.valid &&
        this.step2Form.valid &&
        this.step3Form.valid &&
        this.step4Form.valid &&
        this.step5Form.valid &&
        this.step6Form.valid
    ) {
      console.log("Formulaire soumis avec succès :", this.getAllFormData());
    } else {
      console.error("Veuillez remplir correctement toutes les étapes.");
    }
  }
}
