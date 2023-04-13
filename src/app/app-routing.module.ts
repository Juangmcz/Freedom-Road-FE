import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/forms/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/register'])),
  },
  {
    path: 'bus-tickets',
    component: TicketsPageComponent,
  },
  {
    path: 'our-team',
    component: OurTeamComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
