import { Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SigninrespComponent } from './views/signinresp/signinresp.component';
import { HomeComponent } from './views/home/home.component';
import {ResultComponent} from "./views/result/result.component";
import {BilanComponent} from "./views/bilan/bilan.component";
import {EtatFinancierComponent} from "./views/etat-financier/etat-financier.component";

export const routes: Routes = [
    {path:'signup',component:IndexComponent},
    {path: 'signin',component:IndexComponent},
    {path: 'signinresp',component:SigninrespComponent},
    {path: 'result',component:ResultComponent},
    {path: 'bilan',component:BilanComponent},
    {path: 'indicateur-financier',component:EtatFinancierComponent},
    // {path: 'home',component:HomeComponent},
    // {path:'bon-commande-',component:BonCommandeClientComponent,canActivate:[pasSousFifreGuardGuard]}
];
