import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InputControlComponent} from "../../../reusable/input-control/input-control.component";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {InputDSquareComponent} from "../../atoms/input-d-square/input-d-square.component";
import {CollapsibleComponent} from "../../atoms/collapsible/collapsible.component";
import {SubmitButtonComponent} from "../../../reusable/submit-button/submit-button.component";
import {FormDataFinanceService} from "../form-data-finance/form-data-finance-service.service";
import {EtatFinancierService} from "./etat-financier.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-etat-financier',
  standalone: true,
    imports: [
        InputControlComponent,
        PaginatorModule,
        ReactiveFormsModule,
        SelectRoundedComponent,
        InputDSquareComponent,
        CollapsibleComponent,
        SubmitButtonComponent,
        CommonModule
    ],
  templateUrl: './etat-financier.component.html',
  styleUrl: './etat-financier.component.css'
})
export class EtatFinancierComponent implements OnInit{

    data:any;
    entreprises:any;
    annees:any;
    isLoading:boolean = false;
    result:any = [];
    constructor(private etatFinancierService:EtatFinancierService,private cdr:ChangeDetectorRef) {

    }
    ngOnInit(): void {
        this.isLoading = true;
        this.etatFinancierService.getRatios().subscribe({
            next:(response)=>{
                this.result = response;
                console.log(response);
                this.isLoading = false;
                this.cdr.detectChanges();
            },error:(error)=>{
                console.log(error);
                alert(error);
            }
        })
    }
}
