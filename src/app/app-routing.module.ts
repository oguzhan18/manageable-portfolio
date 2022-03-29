import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';

const routes: Routes = [
  {path: '', component: PortfolioPageComponent},
  {path: 'home', component: PortfolioPageComponent},
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/admin/admin.module').then((m) => m.AdminModule)
    },
  {path: '**', component: PortfolioPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
