import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormDateComponent } from "../../../atoms/form-date/form-date.component";
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FormDateComponent,MatSort],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'id',
    'candidat',
    'poste',
    'score',
    'date_test',
    'action',
  ];
  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort; // To sort
  
  data = [
    { id: 1, candidat: 'John Doe', poste: 25, score: 2, date_test: '2023-04-01' },
    { id: 2, candidat: 'Jane Smith', poste: 30, score: 2, date_test: '2023-04-01' },
    { id: 3, candidat: 'Tom Brown', poste: 45, score: 2, date_test: '2023-04-01' },
    { id: 4, candidat: 'Emily White', poste: 23, score: 2, date_test: '2023-04-01' },
    { id: 5, candidat: 'Michael Green', poste: 34, score: 2, date_test: '2023-04-01' },
  ];

  ngOnInit() {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageEvent(event: any) {
    console.log(event); 
  }
  openDetails(element: any) {
    console.log('Opening details for:', element);
    // this.ouvrir = true;
  }
  idCandidat:any;
  @Output() childEvent = new EventEmitter<string>();
  sendMessageToParent() {
    this.childEvent.emit(this.idCandidat);
  }
}
