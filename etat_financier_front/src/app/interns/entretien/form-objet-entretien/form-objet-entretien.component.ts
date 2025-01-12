import { Component } from '@angular/core';
import { ModalArrayComponent } from "../../../../reusable/modal-array/modal-array.component";
import { InputDSquareComponent } from "../../../atoms/input-d-square/input-d-square.component";
import { SubmitButtonComponent } from "../../../../reusable/submit-button/submit-button.component";

@Component({
  selector: 'app-form-objet-entretien',
  standalone: true,
  imports: [ModalArrayComponent, InputDSquareComponent, SubmitButtonComponent],
  templateUrl: './form-objet-entretien.component.html',
  styleUrl: './form-objet-entretien.component.css'
})
export class FormObjetEntretienComponent {

}
