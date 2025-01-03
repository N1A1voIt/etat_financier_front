import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() label!:string;

}
