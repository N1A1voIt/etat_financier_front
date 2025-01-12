import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuLiComponent } from "../reusable/menu-li/menu-li.component";

@Component({
  selector: 'app-second-menu',
  standalone: true,
  imports: [
    CommonModule,
    MenuLiComponent
],
  templateUrl: 'second-menu.component.html',
  styleUrl: './second-menu.component.css',
})
export class SecondMenuComponent {
  @Input() linksAndLabels!:any
  constructor(){
    // this.linksAndLabels = [
    //   {link:'#',label:"1"},
    //   {link:'#',label:"1"},
    //   {link:'#',label:"1"},
    // ]
  }
}

