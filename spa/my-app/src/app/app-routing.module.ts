import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'vue-app',
    children: [
        {
            path: '**',
            loadChildren: ( ) => import('./spa-host.module').then(m => m.SpaHostModule),
            data: { app: '@somename/vue-app' }
        }
    ]
  },
  {
    path: 'angular-app',
    children: [
        {
            path: '**',
            loadChildren: ( ) => import('./spa-host.module').then(m => m.SpaHostModule),
            data: { app: '@somename/angular-app' }
        }
    ]
  },
  {
    path: 'react-app',
    children: [
        {
            path: '**',
            loadChildren: ( ) => import('./spa-host.module').then(m => m.SpaHostModule),
            data: { app: '@somename/react-app' }
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}