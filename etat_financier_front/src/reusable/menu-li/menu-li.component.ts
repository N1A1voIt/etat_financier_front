import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu-li',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: 'menu-li.component.html',
  styleUrl: './menu-li.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLiComponent {
  hovered!:boolean

  @Input() link!:string
  @Input() label!:string 

  onMouseEnter() {
    this.hovered = true;
  }

  onMouseLeave() {
    this.hovered = false;
  }
  
}
