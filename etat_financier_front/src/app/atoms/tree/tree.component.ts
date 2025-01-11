import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Rubrique} from "../../rubrique.model";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputDSquareComponent} from "../input-d-square/input-d-square.component";

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

  constructor(private fb: FormBuilder) {
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
      id_rubrique: 1,
      rubrique: this.addForm.value.rubrique,
      montant: this.addForm.value.montant,
      n_compte: undefined,
      id_type: parent.id_type,
      id_rubrique_1: parent.id_rubrique,
      children: [],
      showAddForm: false,
      expanded: false
    };

    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(newRubrique);
    parent.showAddForm = false;
  }
  private handleRubriquesChange(rubriques: Rubrique[]): void {
    console.log('Handling rubriques change:', rubriques);
    this.rubriques = rubriques;
  }
}
