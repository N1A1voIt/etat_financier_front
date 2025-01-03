import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-array',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: 'modal-array.component.html',
  styleUrl: './modal-array.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalArrayComponent {
  @Input() showForm:boolean = false;
  @Input() nom!:string;
}
