import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgForm, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { UploadImgComponent } from './components/upload-img/upload-img.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

// Services
import { AnnouncesService } from './services/announces/announces.service'
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UploadImgService } from './services/uploads/upload-img.service';

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
    UploadImgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    NgForm,
    AnnouncesService,
    AuthService,
    AuthGuardService,
    UploadImgService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
