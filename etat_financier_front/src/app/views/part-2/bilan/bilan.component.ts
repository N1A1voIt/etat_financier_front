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
  dataSource2: MatTableDataSource<FlatRubrique>=new MatTableDataSource<FlatRubrique>();
  estEquilibre:boolean = false;
  rubriques: Rubrique[] = [];
  rubriquesPassifs: Rubrique[] = [];
  totalActifs: number = 0;
  totalPassifs: number = 0;
  constructor(private rubriquesService:RubriquesService) {
  }
  ngOnInit() {
    this.rubriquesService.getBilans().subscribe({
      next:(response) => {
        this.estEquilibre = response.data.estEquilibre;
        if (this.estEquilibre) {
          console.log(response);
          let rubriques1 = this.buildTree(response.data.actifs);
          let rubriques2 = this.buildTree(response.data.passifs);
          const flatData = this.flattenRubriques(rubriques1,0,true);
          flatData.push({
            label: 'TOTAL ACTIFS',
            amount: this.totalActifs,
            level: 0,
            isImportant: true,
          })
          const flatData2 = this.flattenRubriques(rubriques2,0,false);
          flatData2.push({
            label: 'TOTAL PASSIFS',
            amount: this.totalPassifs,
            level: 0,
            isImportant: true,
          })
          this.dataSource = new MatTableDataSource(flatData);
          this.dataSource2 = new MatTableDataSource(flatData2);
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
  flattenRubriques(rubriques: Rubrique[], level: number = 0,estActif:boolean): FlatRubrique[] {
    let flatData: FlatRubrique[] = [];
    rubriques.forEach((rubrique) => {
      let amount = rubrique.montant || 0;

      if (rubrique.children && rubrique.children.length > 0) {
        const childrenData = this.flattenRubriques(rubrique.children, level + 1,estActif);
        const childrenAmount = childrenData.reduce((sum, child) => sum + child.amount, 0);

        flatData.push({
          label: rubrique.rubrique,
          amount: 0,
          level: level,
          isImportant: true,
        });

        flatData = flatData.concat(childrenData);

        if (level === 1) {
          flatData.push({
            label: `TOTAL  ${rubrique.rubrique.toUpperCase()}`,
            amount: childrenAmount,
            level: 1,
            isImportant: true,
          });
          if (estActif) {
            console.log(childrenAmount);
            this.totalActifs += childrenAmount;
          }
          else {
            this.totalPassifs += childrenAmount;
          }
        }
      } else {
        flatData.push({
          label: rubrique.rubrique,
          amount: amount,
          level: level,
          isImportant: true,
        });
      }

    });

    return flatData;
  }
}
