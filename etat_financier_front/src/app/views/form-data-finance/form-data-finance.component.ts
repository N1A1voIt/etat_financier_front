import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputControlComponent} from "../../../reusable/input-control/input-control.component";
import {InputDSquareComponent} from "../../atoms/input-d-square/input-d-square.component";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {SubmitButtonComponent} from "../../../reusable/submit-button/submit-button.component";
import {FormDataFinanceService} from "./form-data-finance-service.service";
import {error} from "console";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-form-data-finance',
  standalone: true,
    imports: [
        FormsModule,
        PaginatorModule,
        ReactiveFormsModule,
        InputDSquareComponent,
        SelectRoundedComponent,
        SubmitButtonComponent,
        CommonModule
    ],
  templateUrl: './form-data-finance.component.html',
  styleUrl: './form-data-finance.component.css'
})
export class FormDataFinanceComponent implements OnInit {
    formGroup: FormGroup;
    data:any;
    entreprises:any;
    annees:any;
    constructor(public formBuilder: FormBuilder,private formService:FormDataFinanceService) {
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
    onSubmit(){
        this.formService.saveFinancialData(this.formGroup.value).subscribe({
            next:()=>{
                alert("Financial Successfully saved successfully!");
            },error:(error)=>{
                console.log(error);
                alert(error);
            }
        })
    }

    ngOnInit(): void {
        this.data = this.formService.enterpriseYear().subscribe({
            next:(response)=>{
                this.data = response;
                this.entreprises = this.data.entreprises;
                this.annees = this.data.annees;
                console.log(this.data.entreprises);
            },error:(error)=>{
                alert(error);
            }
        })
    }
}
