import { Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SigninrespComponent } from './views/signinresp/signinresp.component';
import { HomeComponent } from './views/home/home.component';
import {ResultComponent} from "./views/result/result.component";
import {EtatFinancierComponent} from "./views/etat-financier/etat-financier.component";
import {FormDataFinanceComponent} from "./views/form-data-finance/form-data-finance.component";
import {FormCompteResultatComponent} from "./views/part-2/form-compte-resultat/form-compte-resultat.component";
import {RubriqueAddInterfaceComponent} from "./views/part-2/rubrique-add-interface/rubrique-add-interface.component";
import {CompteResultatComponent} from "./views/part-2/compte-resultat/compte-resultat.component";
import {BilanComponent} from "./views/part-2/bilan/bilan.component";

export const routes: Routes = [
    {path:'signup',component:IndexComponent},
    {path: 'signin',component:IndexComponent},
    {path: 'signinresp',component:SigninrespComponent},
    {path: 'result',component:ResultComponent},
    {path: 'bilan',component:BilanComponent},
    {path: 'indicateur-financier',component:EtatFinancierComponent},
    {path: 'form-financier',component:FormDataFinanceComponent},
    {path: 'form-compte-result',component:FormCompteResultatComponent},
    {path: 'rubrique-add',component:RubriqueAddInterfaceComponent},
    {path: 'cdr',component:CompteResultatComponent},
    // {path: 'home',component:HomeComponent},
    // {path:'bon-commande-',component:BonCommandeClientComponent,canActivate:[pasSousFifreGuardGuard]}
];
