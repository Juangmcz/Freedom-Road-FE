import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/forms/login/login.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BusTicketComponent } from './components/bus-tickets/bus-ticket/bus-ticket.component';
import { BusTicketListComponent } from './components/bus-tickets/bus-ticket-list/bus-ticket-list.component';
import { BusTicketListContainerComponent } from './components/bus-tickets/bus-ticket-list-container/bus-ticket-list-container.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    ShoppingCartComponent,
    AboutUsComponent,
    NotFoundComponent,
    HomePageComponent,
    BusTicketComponent,
    BusTicketListComponent,
    BusTicketListContainerComponent,
    FooterComponent,
    TicketsPageComponent,
    CarouselComponent,
    OurTeamComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
