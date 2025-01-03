import {Component, Input} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {NgClass} from "@angular/common";
import {data} from "autoprefixer";

@Component({
  selector: 'app-mini-tab-bilan',
  standalone: true,
    imports: [
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        NgClass,
        MatTableModule,
    ],
  templateUrl: './mini-tab-bilan.component.html',
  styleUrl: './mini-tab-bilan.component.css'
})
export class MiniTabBilanComponent {
    @Input() data: any[] = [
        { label: 'Product A', amount: 120 ,isBold: false },
        { label: 'Product B', amount: 250 , isBold: true },
        { label: 'Service C', amount: 75 ,isBold: false },
        { label: 'Item D', amount: 90 ,isBold: false },
    ];

     dataSource = new MatTableDataSource<any>();

    displayedColumns: string[] = ['label', 'amount'];
    constructor() {
        this.dataSource.data = this.data;
    }
}
