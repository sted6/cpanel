import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthService } from './services/auth.service';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NewAccountEventComponent } from './components/new-account-event/new-account-event.component';
import { PhonePipe } from './pipes/phone.pipe';
import { SocialSecurityPipe } from './pipes/social-security.pipe';


const firebaseConfig = {
  apiKey: "AIzaSyBqhIzX7bK7E9pfuG4bCKCYc34ZJIqaHkI",
  authDomain: "wealthinnovations-clientpanel.firebaseapp.com",
  databaseURL: "https://wealthinnovations-clientpanel.firebaseio.com",
  projectId: "wealthinnovations-clientpanel",
  storageBucket: "wealthinnovations-clientpanel.appspot.com",
  messagingSenderId: "753895806075",
  appId: "1:753895806075:web:a45c846a82f1280a60bede",
  measurementId: "G-CXJYF3G2R6"
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    NavbarComponent,
    LandingComponent,
    NotFoundComponent,
    AddClientComponent,
    EditClientComponent,
    NewAccountEventComponent,
    PhonePipe,
    SocialSecurityPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(), // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
