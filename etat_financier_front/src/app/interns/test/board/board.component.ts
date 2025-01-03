import { Component } from '@angular/core';
import { CandidateComponent } from "../candidate/candidate.component";
import { CandidateOkComponent } from "../candidate-ok/candidate-ok.component";
import { SubmitButtonComponent } from "../../../../reusable/submit-button/submit-button.component";
import { CandidaturesDetailsComponent } from "../../candidatures-details/candidatures-details.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CandidateComponent, CandidateOkComponent, SubmitButtonComponent, CandidaturesDetailsComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  idCandidat:any;
  receiveId(id:any){
    this.idCandidat = id;
  }
}
