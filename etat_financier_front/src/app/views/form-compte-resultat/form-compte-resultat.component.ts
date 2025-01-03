import {Component, OnInit} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {FormDataFinanceService} from "../form-data-finance/form-data-finance-service.service";
import {InputDSquareComponent} from "../../atoms/input-d-square/input-d-square.component";
import {SubmitButtonComponent} from "../../../reusable/submit-button/submit-button.component";

@Component({
  selector: 'app-form-compte-resultat',
  standalone: true,
    imports: [
        PaginatorModule,
        ReactiveFormsModule,
        SelectRoundedComponent,
        InputDSquareComponent,
        SubmitButtonComponent
    ],
  templateUrl: './form-compte-resultat.component.html',
  styleUrl: './form-compte-resultat.component.css'
})
export class FormCompteResultatComponent implements OnInit {
    formGroup : FormGroup;
    data:any;
    entreprises:any;
    annees:any;
    constructor(public formBuilder: FormBuilder,private formService:FormDataFinanceService) {
        this.formGroup = formBuilder.group({
            idEntreprise:[""],
            idAnnee:[""],
            revenus:[""],
            impots:[""],
            chargesFinancieres:[""],
            chargesExploitation:[""]
        })
    }
    onSubmit(){
        this.formService.saveCompteResultatData(this.formGroup.value).subscribe({
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
