import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddItemComponent } from './components/add-item/add-item.component';

// Services
import { AnnouncesService } from './services/announces/announces.service'
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';

const appRoutes : Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'liste', /* canActivate: [AuthGuardService], */  component: ListItemsComponent },
  { path: 'liste/:id', /* canActivate: [AuthGuardService], */ component: ItemDetailsComponent },
  { path: 'ajout-annonce', /* canActivate: [AuthGuardService], */ component: AddItemComponent },
]
@NgModule({
  declarations: [
    // Components
    AppComponent,
    NavigationComponent,
    CardItemComponent,
    ListItemsComponent,
    AuthComponent,
    AddItemComponent,
    ItemDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [NgForm, AnnouncesService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
