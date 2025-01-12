import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-td-ge',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './td-ge.component.html',
  styleUrl: './td-ge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TdGeComponent {
  @Input() content!:string
}
