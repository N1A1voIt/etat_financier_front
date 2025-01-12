import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {CommonModule, NgClass} from "@angular/common";
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
        CommonModule
    ],
  templateUrl: './mini-tab-bilan.component.html',
  styleUrl: './mini-tab-bilan.component.css'
})
export class MiniTabBilanComponent implements OnChanges {
    @Input() data: any; // Input property to receive data
    @Input() title: string = '';
    dataSource = new MatTableDataSource<any>(); // Data source for the table
    displayedColumns: string[] = ['label', 'amount']; // Columns to display

    constructor() {
        console.log('Constructor called');
    }

    // Lifecycle hook to detect changes to @Input() properties
    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges called', changes);
        if (changes['data'] && this.data) {
            this.dataSource.data = this.data; // Update the data source when data changes
        }
    }
}
