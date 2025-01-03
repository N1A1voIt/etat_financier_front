import { Component } from '@angular/core';
import {MiniTabBilanComponent} from "../../atoms/mini-tab-bilan/mini-tab-bilan.component";
import {CollapsibleComponent} from "../../atoms/collapsible/collapsible.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription, MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
@Component({
  selector: 'app-bilan',
  standalone: true,
    imports: [
        MiniTabBilanComponent,
        MatExpansionPanel,
        MatAccordion,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        CollapsibleComponent
    ],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent {

}
