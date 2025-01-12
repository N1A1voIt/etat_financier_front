import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Rubrique} from "../../rubrique.model";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputDSquareComponent} from "../input-d-square/input-d-square.component";
import {RubriquesService} from "../../views/part-2/services/rubriques.service";

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CommonModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    ReactiveFormsModule,
    InputDSquareComponent,
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent implements OnChanges {
  @Input() rubriques: Rubrique[]|undefined;
  addForm: FormGroup;

  constructor(private fb: FormBuilder,private rubriqueService:RubriquesService) {
    this.addForm = this.fb.group({
      rubrique: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rubriques']) {
      const currentValue = changes['rubriques'].currentValue;
      const previousValue = changes['rubriques'].previousValue;

      console.log('Current rubriques:', currentValue);
      console.log('Previous rubriques:', previousValue);

      if (currentValue !== previousValue) {
        this.handleRubriquesChange(currentValue);
      }
    }
  }
  showAddForm(rubrique: Rubrique) {
    rubrique.showAddForm = true;
    this.addForm.reset();
  }
  closeAddForm(rubrique: Rubrique) {
    rubrique.showAddForm = false;
  }
  addRubrique(parent: Rubrique) {
    if (this.addForm.invalid) {
      return;
    }
    const newRubrique: Rubrique = {
      idRubrique: undefined,
      rubrique: this.addForm.value.rubrique,
      montant: this.addForm.value.montant,
      nCompte: undefined,
      idType: parent.idType,
      idRubriqueMere: parent.idRubrique,
      children: [],
      showAddForm: false,
      expanded: false
    };

    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(newRubrique);
    parent.showAddForm = false;
    this.rubriqueService.save(newRubrique).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }
  private handleRubriquesChange(rubriques: Rubrique[]): void {
    console.log('Handling rubriques change:', rubriques);
    this.rubriques = rubriques;
  }
}
