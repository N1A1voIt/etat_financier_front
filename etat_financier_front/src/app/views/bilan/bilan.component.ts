import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {BilanService} from "./bilan.service";
import {NgIf} from "@angular/common";
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
        SubmitButtonComponent,
        NgIf
    ],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent implements OnInit{
    formGroup : FormGroup;
    data:any;
    entreprises:any;
    annees:any;
    bilan:any
    constructor(public formBuilder: FormBuilder,private formService:FormDataFinanceService,private bilanService:BilanService,private cdr:ChangeDetectorRef) {
        console.log(this.bilan)
        this.formGroup = formBuilder.group({
            idEntreprise:[""],
            idAnnee:[""]
        })
    }

    calculateTotalActifs() {
        let totalActifs = 0;

        this.bilan.ActifCourant.forEach((item: { label:string,amount: number,isBold:boolean }) => {
            totalActifs += item.amount;
        });

        this.bilan.ActifImmobilise.forEach((item: { label:string,amount: number,isBold:boolean }) => {
            totalActifs += item.amount;
        });

        return totalActifs;
    }

    calculateTotalPassifs() {
        let totalPassifs = 0;

        // Sum up Passif
        this.bilan.Passif.forEach((item: { label:string,amount: number,isBold:boolean }) => {
            totalPassifs += item.amount;
        });

        // Sum up PassifNonCourant
        this.bilan.PassifNonCourant.forEach((item: { label:string,amount: number,isBold:boolean }) => {
            totalPassifs += item.amount;
        });

        // Sum up CapitauxPropres
        this.bilan.CapitauxPropres.forEach((item: { label:string,amount: number,isBold:boolean }) => {
            totalPassifs += item.amount;
        });

        return totalPassifs;
    }

    onSubmit(){
        this.bilanService.getBilan(this.formGroup.value).subscribe({
            next:(response)=>{
                this.bilan = response;
                this.cdr.detectChanges();
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
