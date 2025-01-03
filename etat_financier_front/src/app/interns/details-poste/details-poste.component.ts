import { Component, Input } from '@angular/core';
import { ModalArrayComponent } from "../../../reusable/modal-array/modal-array.component";

@Component({
  selector: 'app-details-poste',
  standalone: true,
  imports: [ModalArrayComponent],
  templateUrl: './details-poste.component.html',
  styleUrl: './details-poste.component.css'
})
export class DetailsPosteComponent {
  @Input() ouvrir:boolean = false;
  @Input() details:any;
  @Input() data:any;
}
