import { Component } from '@angular/core';
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
    NgClass
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  dataSource = new MatTableDataSource<any>([
    { label: 'Product A', amount: 120 ,isBold: false },
    { label: 'Product B', amount: 250 , isBold: true },
    { label: 'Service C', amount: 75 ,isBold: false },
    { label: 'Item D', amount: 90 ,isBold: false },
  ]);

  displayedColumns: string[] = ['label', 'amount'];
}
