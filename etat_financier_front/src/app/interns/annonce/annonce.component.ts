import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DetailsPosteComponent } from "../details-poste/details-poste.component";
import { ModalArrayComponent } from "../../../reusable/modal-array/modal-array.component";
import { CandidaturesDetailsComponent } from "../candidatures-details/candidatures-details.component";
import { GenServiceService } from '../../gen-service.service';
import { AnnonceService } from './annonce.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [MatTableModule, MatPaginator, DetailsPosteComponent, ModalArrayComponent, CandidaturesDetailsComponent],
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css'
})
export class AnnonceComponent implements OnInit{
  ouvrir:boolean=false;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['posteId', 'titre','description','qualifications','experienceRequise', 'domaine','dateCreation','action'];
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data :any;
  detailsPoste:any;
  constructor(private genService:GenServiceService,private as:AnnonceService,public route:Router) {
    
  }
  async ngOnInit() {
    this.dataSource.data = await this.genService.dropDown("postes").toPromise();
    console.log(this.dataSource.data)
    this.data = this.dataSource.data;
    this.dataSource.paginator = await this.paginator;
    this.dataSource.sort = await this.sort;
  }
  detailsPostes(id:any){
    this.as.posteById(id).subscribe({
      next:(resp)=>{
        this.detailsPoste = resp;
        console.log(this.detailsPoste)
      }
    })
  }
  pageEvent(event: any) {
    console.log(event); // Optionally log the pagination event
  }


}
