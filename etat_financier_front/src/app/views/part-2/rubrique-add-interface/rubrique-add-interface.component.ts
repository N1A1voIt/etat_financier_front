import { Component } from '@angular/core';
import {Rubrique} from "../../../rubrique.model";
import {TreeComponent} from "../../../atoms/tree/tree.component";

@Component({
  selector: 'app-rubrique-add-interface',
  standalone: true,
  imports: [
    TreeComponent
  ],
  templateUrl: './rubrique-add-interface.component.html',
  styleUrl: './rubrique-add-interface.component.css'
})
export class RubriqueAddInterfaceComponent {
  rootRubriques: Rubrique[] = [
    {
      "id_rubrique": 1,
      "rubrique": "Assets",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 1,
      "id_rubrique_1": undefined
    },
    {
      "id_rubrique": 2,
      "rubrique": "Current Assets",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 2,
      "id_rubrique_1": 1
    },
    {
      "id_rubrique": 3,
      "rubrique": "Cash",
      "montant": 100000,
      "n_compte": "101",
      "id_type": 3,
      "id_rubrique_1": 2
    },
    {
      "id_rubrique": 4,
      "rubrique": "Accounts Receivable",
      "montant": 50000,
      "n_compte": "102",
      "id_type": 3,
      "id_rubrique_1": 2
    },
    {
      "id_rubrique": 5,
      "rubrique": "Inventory",
      "montant": 75000,
      "n_compte": "103",
      "id_type": 3,
      "id_rubrique_1": 2
    },
    {
      "id_rubrique": 6,
      "rubrique": "Non-Current Assets",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 2,
      "id_rubrique_1": 1
    },
    {
      "id_rubrique": 7,
      "rubrique": "Property",
      "montant": 500000,
      "n_compte": "110",
      "id_type": 3,
      "id_rubrique_1": 6
    },
    {
      "id_rubrique": 8,
      "rubrique": "Equipment",
      "montant": 300000,
      "n_compte": "111",
      "id_type": 3,
      "id_rubrique_1": 6
    },
    {
      "id_rubrique": 9,
      "rubrique": "Liabilities and Equity",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 1,
      "id_rubrique_1": undefined
    },
    {
      "id_rubrique": 10,
      "rubrique": "Current Liabilities",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 2,
      "id_rubrique_1": 9
    },
    {
      "id_rubrique": 11,
      "rubrique": "Accounts Payable",
      "montant": 80000,
      "n_compte": "201",
      "id_type": 3,
      "id_rubrique_1": 10
    },
    {
      "id_rubrique": 12,
      "rubrique": "Short-term Debt",
      "montant": 100000,
      "n_compte": "202",
      "id_type": 3,
      "id_rubrique_1": 10
    },
    {
      "id_rubrique": 13,
      "rubrique": "Non-Current Liabilities",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 2,
      "id_rubrique_1": 9
    },
    {
      "id_rubrique": 14,
      "rubrique": "Long-term Debt",
      "montant": 300000,
      "n_compte": "210",
      "id_type": 3,
      "id_rubrique_1": 13
    },
    {
      "id_rubrique": 15,
      "rubrique": "Equity",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 2,
      "id_rubrique_1": 9
    },
    {
      "id_rubrique": 16,
      "rubrique": "Share Capital",
      "montant": 200000,
      "n_compte": "301",
      "id_type": 3,
      "id_rubrique_1": 15
    },
    {
      "id_rubrique": 17,
      "rubrique": "Retained Earnings",
      "montant": 150000,
      "n_compte": "302",
      "id_type": 3,
      "id_rubrique_1": 15
    },
    {
      "id_rubrique": 18,
      "rubrique": "Investments",
      "montant": undefined,
      "n_compte": undefined,
      "id_type": 2,
      "id_rubrique_1": 1
    },
    {
      "id_rubrique": 19,
      "rubrique": "Stocks",
      "montant": 120000,
      "n_compte": "401",
      "id_type": 3,
      "id_rubrique_1": 18
    },
    {
      "id_rubrique": 20,
      "rubrique": "Bonds",
      "montant": 80000,
      "n_compte": "402",
      "id_type": 3,
      "id_rubrique_1": 18
    }
  ];

  constructor() {
    this.rootRubriques = this.buildTree(this.rootRubriques);
  }

  ngOnInit() {

  }

  buildTree(rubriques: Rubrique[]): Rubrique[] {
    const rubriqueMap = new Map<number, Rubrique>();
    const rootRubriques: Rubrique[] = [];

    rubriques.forEach(rubrique => {
      rubrique.children = [];
      rubriqueMap.set(rubrique.id_rubrique, rubrique);
    });

    rubriques.forEach(rubrique => {
      if (rubrique.id_rubrique_1) {
        const parent = rubriqueMap.get(rubrique.id_rubrique_1);
        if (parent) {
          // @ts-ignore
          parent.children.push(rubrique);
        } else {
          console.error(`Parent rubrique with ID ${rubrique.id_rubrique_1} not found.`);
        }
      } else {
        rootRubriques.push(rubrique);
      }
    });

    return rootRubriques;
  }
}
