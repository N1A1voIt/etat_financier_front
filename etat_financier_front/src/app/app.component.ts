import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from "../reusable/menu-bar/menu-bar.component";
import { InputComponent } from "../reusable/input/input.component";
import { AppService } from './app.service';
import { HomeComponent } from "./views/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBarComponent, InputComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ERP';
    isLoggedIn: boolean = false;
    showdiv: boolean = false;
    showcrud: boolean = false;
    showstate: boolean = false;
    menuType: any;
    showCart: boolean = false;
    isCrudPage: boolean = false;
    isStatisticsPage: boolean = false;
    selectedPage!: string;
    selectedLink!: string;
    isPaymentPage:boolean = false;
    name!:string;
    constructor(
        private appService: AppService,
        public router: Router
    ) {}
  checkToken() {
    if (localStorage.getItem('userToken') != null) {
        this.isLoggedIn = true;
        // @ts-ignore
        return this.appService
        // @ts-ignore
            .retrieveMyProfile(localStorage.getItem('userToken'))
            .subscribe({
        // @ts-ignore
                next: (response) => {
                    if (response != null) {
                        console.log(response);
                        this.isLoggedIn = true;
                        this.name=response.name;
                    } else {
                        this.isLoggedIn = false;
                    }
                },
            });
    }
    return null;
}
}
