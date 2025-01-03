import { Component, Input } from '@angular/core';
import { ModalArrayComponent } from "../../../reusable/modal-array/modal-array.component";
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidatures-details',
  standalone: true,
  imports: [ModalArrayComponent,MatIcon,CommonModule],
  templateUrl: './candidatures-details.component.html',
  styleUrl: './candidatures-details.component.css'
})
export class CandidaturesDetailsComponent {
ouvrir: boolean = true;
@Input() cv:any;

}
