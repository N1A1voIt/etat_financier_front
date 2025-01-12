import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu-title',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './menu-title.component.html',
  styleUrl: './menu-title.component.css'
})
export class MenuTitleComponent {
  @Input() label:any;
  @Input() icon:any;
}
