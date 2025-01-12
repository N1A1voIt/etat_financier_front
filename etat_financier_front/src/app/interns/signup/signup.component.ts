import { Component } from "@angular/core";
import { InputControlComponent } from "../../../reusable/input-control/input-control.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component";
import { BehaviorSubject } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SignupService } from "./signup.service";
import { IndexComponent } from "../../views/index/index.component";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    InputControlComponent,
    SubmitButtonComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  step1Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sus: SignupService,
    private index: IndexComponent
  ) {
    this.step1Form = this.fb.group({
      candidat: this.fb.group({
        nom: ["", Validators.required],
        prenom: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        motDePasse: ["", [Validators.required, Validators.minLength(6)]],
        telephone: ["", [Validators.required, Validators.minLength(6)]],
      }),
    });
  }

  onSubmit() {
    // if (this.step1Form.valid) {
    this.sus.updateFormData("step1", this.step1Form.value);
    this.index.currentStep = 2;
    // }
  }
}
