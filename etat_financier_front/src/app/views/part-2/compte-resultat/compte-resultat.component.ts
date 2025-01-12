import {Component, OnInit} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {DecimalPipe, NgClass} from "@angular/common";
import {CompteResultatService} from "../services/compte-resultat.service";

@Component({
  selector: 'app-compte-resultat',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    NgClass,
    MatHeaderRow,
    MatRow,
    DecimalPipe,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './compte-resultat.component.html',
  styleUrl: './compte-resultat.component.css'
})
export class CompteResultatComponent  implements OnInit {
  displayedColumns: string[] = ['label', 'amount']; // Colonnes à afficher
  dataSource: any[] = []; // Source de données pour la table

  constructor(private vueCompteResultatService: CompteResultatService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vueCompteResultatService.getCdr().subscribe((data: any[]) => {
      this.dataSource = data.map(item => ({
        label: item.rubriques,
        amount: item.montant,
        isImportant: item.isImportant
      }));
    });
  }
}
