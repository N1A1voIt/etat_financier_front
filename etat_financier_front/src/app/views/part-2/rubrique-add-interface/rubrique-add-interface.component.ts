import {Component, OnInit} from '@angular/core';
import {Rubrique} from "../../../rubrique.model";
import {TreeComponent} from "../../../atoms/tree/tree.component";
import {RubriquesService} from "../services/rubriques.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-rubrique-add-interface',
  standalone: true,
  imports: [
    TreeComponent,
    JsonPipe
  ],
  templateUrl: './rubrique-add-interface.component.html',
  styleUrl: './rubrique-add-interface.component.css'
})
export class RubriqueAddInterfaceComponent implements OnInit {
  rootRubriques: Rubrique[] = [];

  constructor(private rubriquesService:RubriquesService) {

  }

  ngOnInit() {
    this.rubriquesService.getRubriques().subscribe({
      next:(response) => {
        this.rootRubriques = response.data;
        this.rootRubriques = this.buildTree(this.rootRubriques);
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
}
