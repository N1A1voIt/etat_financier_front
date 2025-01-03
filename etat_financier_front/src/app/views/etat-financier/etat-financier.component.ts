import { Component } from '@angular/core';
import {InputControlComponent} from "../../../reusable/input-control/input-control.component";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectRoundedComponent} from "../../atoms/select-rounded/select-rounded.component";
import {InputDSquareComponent} from "../../atoms/input-d-square/input-d-square.component";
import {CollapsibleComponent} from "../../atoms/collapsible/collapsible.component";

@Component({
  selector: 'app-etat-financier',
  standalone: true,
    imports: [
        InputControlComponent,
        PaginatorModule,
        ReactiveFormsModule,
        SelectRoundedComponent,
        InputDSquareComponent,
        CollapsibleComponent
    ],
  templateUrl: './etat-financier.component.html',
  styleUrl: './etat-financier.component.css'
})
export class EtatFinancierComponent {

}
