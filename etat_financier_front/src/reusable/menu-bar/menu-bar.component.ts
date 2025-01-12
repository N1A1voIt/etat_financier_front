import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MenuLiComponent } from "../menu-li/menu-li.component";
import { SecondMenuComponent } from "../../second-menu/second-menu.component";
import { ActivatedRoute } from '@angular/router';
import { link } from 'fs';
@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MenuLiComponent,
    SecondMenuComponent
],
  templateUrl: 'menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {
    changePoseState!:boolean
    initialMenu:any
    insertMenu:any
    resMenu:any
    currentMenu!: any[];
    constructor(private route:ActivatedRoute){
      this.initialMenu = [
        {
          link:'demande-achat',
          label:'Demande achat'
        },
        {
          link:"bon-commande",
          label:"Bon de commande fournisseur"
        },
        {
          link:"bon-commande-client",
          label:"Bon de commande client"
        },
        {
          link:"bon-commande-list",
          label:"Liste des bons de commande clients"
        },
        {
          link:"bon-reception",
          label:"Bon de réception fournisseur"
        },
        {
          link:"bon-livraison",
          label:"Bon de livraison fournisseur"
        },
        {
          link:"etat-stock",
          label:"Etat de stock"
        },
        {
          link:"form-user",
          label:"Gérer utilisateur"
        },
        {
          link:"/",
          label:"Login"
        },
      ]
    }
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if(fragment){
        if (fragment.includes('insert')) {
          this.currentMenu = this.insertMenu;
        }
        if(fragment.includes('result')){
          this.currentMenu = this.resMenu
        }
        if(fragment.includes('home')){
          this.currentMenu = this.initialMenu
        }
      }
      else {
        this.currentMenu = this.initialMenu;
      }
    });
  }
 }
