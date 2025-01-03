import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputControlComponent} from "../../../reusable/input-control/input-control.component";
import {InputDSquareComponent} from "../../atoms/input-d-square/input-d-square.component";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {SubmitButtonComponent} from "../../../reusable/submit-button/submit-button.component";

@Component({
  selector: 'app-form-data-finance',
  standalone: true,
    imports: [
        FormsModule,
        PaginatorModule,
        ReactiveFormsModule,
        InputDSquareComponent,
        SelectRoundedComponent,
        SubmitButtonComponent
    ],
  templateUrl: './form-data-finance.component.html',
  styleUrl: './form-data-finance.component.css'
})
export class FormDataFinanceComponent {
    formGroup: FormGroup;
    constructor(public formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            idEntreprise:[""],
            idAnnee:[""],
            immobilisationCorporelle:[""],
            immobilisationIncorporelle:[""],
            immobilisationFinanciere:[""],
            autresImmobilisations:[""],
            stocks:[""],
            creancesClients:[""],
            disponibilite:[""],
            autresActifsCourant:[""],
            capitalSocial:[""],
            reserves:[""],
            exoResult:[""],
            autresCapitauxPropres:[""],
            dettesFournisseurs:[""],
            dettesFiscales:[""],
            aPassifsCourants:[""],
            emprunts:[""],
            provisions:[""],
            aPassifsNonCourants:[""]
        })
    }
}
