import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AddFormComponent } from './components/announce/add-form/add-form.component';
import { AnnounceDetailsComponent } from './components/announce-details/announce-details.component';
import { ModalBuyTickectComponent } from './components/modals/modals-announce/buy-ticket/modal-buy-ticket.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ModalUpdateProfileComponent } from './components/modals/modals-profile/update/modal-update-profile.component';
import { ModalCreditProfileComponent } from './components/modals/modals-profile/credit/modal-credit-profile.component';
import { ModalWishGoodLuckComponent } from './components/modals/modals-announce/wish-good-luck/modal-wish-good-luck.component';

import { ModalWithdrawComponent } from './components/modals/modals-profile/withdraw/modal-withdraw.component';
import { SummaryAnnounceComponent } from './components/summary-announce/summary-announce.component';
import { FooterComponent } from './components/footer/footer.component';
// Libs
import { HeaderComponent } from './shared/libs/ux-ui/header/header.component';
import { InputComponent } from './shared/libs/ux-ui/forms/input/input.component';
import { BtnCtaFullComponent } from './shared/libs/ux-ui/buttons/btn-cta-full/btn-cta-full.component';
// Services
import { AnnouncesService } from './services/announces/announces.service';
import { AuthService } from './services/auth/auth.service';
import { UploadImgService } from './services/uploads/upload-img.service';

const appRoutes: Routes = [
  // { path: '', component: ListItemsComponent },
  { path: '', component: ListItemsComponent },
  {
    path: 'recherche',
    /* canActivate: [AuthGuardService], */ component: ListItemsComponent,
  },
  {
    path: 'inscription',
    /* canActivate: [AuthGuardService], */ component: SignUpComponent,
  },
  {
    path: 'connexion',
    /* canActivate: [AuthGuardService], */ component: SignInComponent,
  },
  {
    path: 'profil',
    /* canActivate: [AuthGuardService], */ component: UserProfileComponent,
  },
  {
    path: 'liste/:id',
    /* canActivate: [AuthGuardService], */ component: AnnounceDetailsComponent,
  },
  {
    path: 'ajout-annonce',
    /* canActivate: [AuthGuardService], */ component: AddFormComponent,
  },
  {
    path: 'recapitulatif-annonce',
    /* canActivate: [AuthGuardService], */ component: SummaryAnnounceComponent,
  },
  {
    path: 'achat-ticket/:id',
    /* canActivate: [AuthGuardService], */ component: ModalBuyTickectComponent,
  },
];
@NgModule({
  declarations: [
    // Components
    AppComponent,
    NavigationComponent,
    CardItemComponent,
    ListItemsComponent,
    SignUpComponent,
    AddFormComponent,
    AnnounceDetailsComponent,
    ModalBuyTickectComponent,
    UserProfileComponent,
    SignInComponent,
    LandingPageComponent,
    ModalUpdateProfileComponent,
    ModalCreditProfileComponent,
    ModalWithdrawComponent,
    ModalWishGoodLuckComponent,
    HeaderComponent,
    InputComponent,
    BtnCtaFullComponent,
    SummaryAnnounceComponent,
    FooterComponent,
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
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
  providers: [NgForm, AnnouncesService, AuthService, UploadImgService],
  bootstrap: [AppComponent],
})
export class AppModule {}
