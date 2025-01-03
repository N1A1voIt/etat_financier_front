import { Component } from '@angular/core';
import {MiniTabBilanComponent} from "../../atoms/mini-tab-bilan/mini-tab-bilan.component";

@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [
    MiniTabBilanComponent
  ],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent {

}
