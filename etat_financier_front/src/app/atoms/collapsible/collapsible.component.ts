import {Component, Input} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-collapsible',
  standalone: true,
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIcon
    ],
  templateUrl: './collapsible.component.html',
  styleUrl: './collapsible.component.css'
})
export class CollapsibleComponent {
    @Input() indicator:any={
        "label": "Marge Nette",
        "ratio": -200.0000000000000000,
        "interpretation": "The net profit margin measures the percentage of revenue that remains as profit after all expenses. A negative net profit margin of -200% indicates the company is losing significantly more money than it is earning, which is a major concern.",
        "solution": "To improve the net profit margin, the company should focus on reducing costs, increasing revenue, or a combination of both. This could involve renegotiating supplier contracts, optimizing operational efficiency, or exploring new revenue streams."
    }

}
