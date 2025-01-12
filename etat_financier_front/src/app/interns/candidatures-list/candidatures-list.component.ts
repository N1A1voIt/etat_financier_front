import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import { CandidaturesDetailsComponent } from "../candidatures-details/candidatures-details.component";
import { MatSort } from "@angular/material/sort";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { FormDateComponent } from "../../atoms/form-date/form-date.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CandidaturesListService } from "./candidatures-list.service";
import { error } from "console";
import { CommonModule } from "@angular/common";
import { response } from "express";
@Component({
  selector: "app-candidatures-list",
  standalone: true,
  imports: [
    MatTable,
    MatTableModule,
    MatPaginator,
    CandidaturesDetailsComponent,
    CalendarModule,
    FormsModule,
    FormDateComponent,
    CommonModule
  ],
  templateUrl: "./candidatures-list.component.html",
  styleUrl: "./candidatures-list.component.css",
})
export class CandidaturesListComponent implements OnInit {
  ouvrir: boolean = false;
  ouvrirForm: boolean = false;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    "candidatureId",
    "candidat",
    "poste",
    "dateCandidature",
    "note",
    "statut",
    "action",
  ];
  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort; // To sort
  data:any;
  posteId:any;
  cv:any;


  constructor(private route: ActivatedRoute,private cdS:CandidaturesListService) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.posteId = params.get("posteId");
      console.log("Poste ID:", this.posteId);
      this.cdS.getCandidatures(this.posteId).subscribe({
        next:(resp)=>{
          this.dataSource.data = resp;
          console.log(resp)
          this.data = resp;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },error:(error)=>{
          alert(error)
        }
      })
    });
  }

  pageEvent(event: any) {
    console.log(event);
  }
  openDetails(element: any) {
    console.log("Opening details for:", element);
    this.getCv(element.candidatureId)
    console.log(this.cv)
  }
  getCv(id:any){
    this.cdS.getCv(id).subscribe({
      next:(response) =>{
        this.cv = response
      },error(err) {
          console.log(err)
      },
    })
  }
}
