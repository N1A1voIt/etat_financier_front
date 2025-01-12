import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Rubrique} from "../../../rubrique.model";
import {DecimalPipe, NgClass, NgIf} from "@angular/common";
import {RubriquesService} from "../services/rubriques.service";
interface FlatRubrique {
  label: string;
  amount: number;
  level: number; // Indentation level for hierarchy
  isImportant?: boolean;
}

@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    NgClass,
    DecimalPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    NgIf
  ],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent implements OnInit {
  displayedColumns: string[] = ['label', 'amount'];
  dataSource: MatTableDataSource<FlatRubrique>=new MatTableDataSource<FlatRubrique>();
  estEquilibre:boolean = false;
  rubriques: Rubrique[] = [];
  constructor(private rubriquesService:RubriquesService) {
  }
  ngOnInit() {
    this.rubriquesService.getBilans().subscribe({
      next:(response) => {
        this.estEquilibre = response.estEquilibre;
        if (this.estEquilibre) {
          let rubriques1 = this.buildTree(response.data);
          const flatData = this.flattenRubriques(rubriques1);
          this.dataSource = new MatTableDataSource(flatData);
        }
      },error:(error) => {
        alert(error);
      }
    });
  }

  buildTree(rubriques: Rubrique[]): Rubrique[] {
    const rubriqueMap = new Map<number, Rubrique>();
    const rootRubriques: Rubrique[] = [];

    rubriques.forEach(rubrique => {
      rubrique.children = [];
      if (rubrique.idRubrique != null) {
        rubriqueMap.set(rubrique.idRubrique, rubrique);
      }
    });

    rubriques.forEach(rubrique => {
      if (rubrique.idRubriqueMere) {
        const parent = rubriqueMap.get(rubrique.idRubriqueMere);
        if (parent) {
          // @ts-ignore
          parent.children.push(rubrique);
        } else {
          console.error(`Parent rubrique with ID ${rubrique.idRubriqueMere} not found.`);
        }
      } else {
        rootRubriques.push(rubrique);
      }
    });

    return rootRubriques;
  }
  flattenRubriques(rubriques: Rubrique[], level: number = 0): FlatRubrique[] {
    let flatData: FlatRubrique[] = [];

    rubriques.forEach((rubrique) => {
      flatData.push({
        label: rubrique.rubrique,
        amount: rubrique.montant || 0,
        level: level,
        isImportant: true,
      });

      if (rubrique.children && rubrique.children.length > 0) {
        flatData = flatData.concat(this.flattenRubriques(rubrique.children, level + 1));
      }
    });

    return flatData;
  }
}
