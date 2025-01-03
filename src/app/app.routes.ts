import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LaborantinComponent } from './pages/laborantin/laborantin.component';
import { InfermierComponent } from './pages/infermier/infermier.component';
import { ListeRadiosComponent } from './pages/liste-radio/liste-radio.component';
import { ListeAntecedentComponent } from './pages/liste-antecedent/liste-antecedent.component';
import { ConsultationsComponent } from './pages/liste-consul/liste-consul.component';


import { ListeOrdoComponent } from './pages/liste-ordo/liste-ordo.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'laborantin', // Nouvelle route
                component: LaborantinComponent
            },
            {
                path: 'infermier', // Nouvelle route
                component: InfermierComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'radiologue',
                component: ListeRadiosComponent
            },
            //pour le test 
            {
                path: 'ordo',
                component: ListeOrdoComponent
            },
            {
                path: 'antc',
                component: ListeAntecedentComponent
            },

            {
                path: 'consul',
                component: ConsultationsComponent
            }
        ]
    }
];
