import {Component, OnInit} from '@angular/core';
import {MiniTabBilanComponent} from "../../atoms/mini-tab-bilan/mini-tab-bilan.component";
import {CollapsibleComponent} from "../../atoms/collapsible/collapsible.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription, MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {SubmitButtonComponent} from "../../../reusable/submit-button/submit-button.component";
import {FormDataFinanceService} from "../form-data-finance/form-data-finance-service.service";
@Component({
  selector: 'app-bilan',
  standalone: true,
    imports: [
        MiniTabBilanComponent,
        MatExpansionPanel,
        MatAccordion,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        CollapsibleComponent,
        PaginatorModule,
        ReactiveFormsModule,
        SelectRoundedComponent,
        SubmitButtonComponent
    ],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent implements OnInit{
    formGroup : FormGroup;
    data:any;
    entreprises:any;
    annees:any;
    constructor(public formBuilder: FormBuilder,private formService:FormDataFinanceService) {
        this.formGroup = formBuilder.group({
            idEntreprise:[""],
            idAnnee:[""]
        })
    }
    onSubmit(){

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
