import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-range',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './range.component.html',
  styleUrl: './range.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent {
  percentage:number = 0
  @Input() heading!:string
  constructor(){}
}
