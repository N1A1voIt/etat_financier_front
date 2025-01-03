import { Component } from '@angular/core';
import { CandidaturesDetailsComponent } from "../../candidatures-details/candidatures-details.component";
import { CandidatsGuestsComponent } from "../candidats-guests/candidats-guests.component";
import { CandidatFinauxComponent } from "../candidat-finaux/candidat-finaux.component";

@Component({
  selector: 'app-board-ent',
  standalone: true,
  imports: [CandidaturesDetailsComponent, CandidatsGuestsComponent, CandidatFinauxComponent],
  templateUrl: './board-ent.component.html',
  styleUrl: './board-ent.component.css'
})
export class BoardEntComponent {

}
