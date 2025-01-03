import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailsPosteComponent} from "../../interns/details-poste/details-poste.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgClass} from "@angular/common";
import {InputDSquareComponent} from "../../atoms/input-d-square/input-d-square.component";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule} from "@angular/forms";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {FormDataFinanceService} from "../form-data-finance/form-data-finance-service.service";
import {ResultService} from "./result.service";
import {SubmitButtonComponent} from "../../../reusable/submit-button/submit-button.component";

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    DetailsPosteComponent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableModule,
    NgClass,
    InputDSquareComponent,
    PaginatorModule,
    ReactiveFormsModule,
    SelectRoundedComponent,
    SubmitButtonComponent
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  formGroup: FormGroup;
  dataSource = new MatTableDataSource<any>([
  ]);
  data:any;
  entreprises:any;
  annees:any;
  displayedColumns: string[] = ['label', 'amount'];


  constructor(private formBuilder:FormBuilder,private formService:FormDataFinanceService,private service:ResultService,private cdr:ChangeDetectorRef) {
    this.formGroup = formBuilder.group({
      idEntreprise:[""],
      idAnnee:[""]
    });
  }
  onSubmit() {
    this.service.getFinancialData(this.formGroup.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.dataSource.data = response.compteResultatCplRows;
        this.cdr.detectChanges();
      },error:(err) => {
        alert("Error getting financial data");
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
