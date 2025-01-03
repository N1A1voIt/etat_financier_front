import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MenuLiComponent } from "../../../reusable/menu-li/menu-li.component";
import { AvatarComponent } from "../../atoms/avatar/avatar.component";
import { MenuTitleComponent } from "../../atoms/menu-title/menu-title.component";
import { ProfilComponent } from "../../interns/profil/profil.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIcon, MenuLiComponent, AvatarComponent, MenuTitleComponent, ProfilComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
