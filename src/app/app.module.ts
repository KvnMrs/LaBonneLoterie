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
import { NavigationComponent } from './components/commun/navigation/navigation.component';
import { CardComponent } from './components/announce/card/card.component';
import { ListItemsComponent } from './components/announce/list-page/list-items.component';
import { SignUpComponent } from './components/user/auth/sign-up/sign-up.component';
import { AddFormComponent } from './components/announce/add-form/add-form.component';
import { DetailPageComponent } from './components/announce/detail-page/detail-page.component';
import { ModalBuyTickectComponent } from './components/modals/modals-announce/buy-ticket/modal-buy-ticket.component';
import { ProfileComponent } from './components/user/profile-page/profile.component';
import { SignInComponent } from './components/user/auth/sign-in/sign-in.component';
import { LandingPageComponent } from './components/commun/landing-page/landing-page.component';
import { ModalUpdateProfileComponent } from './components/modals/modals-profile/update/modal-update-profile.component';
import { ModalCreditProfileComponent } from './components/modals/modals-profile/credit/modal-credit-profile.component';
import { ModalWishGoodLuckComponent } from './components/modals/modals-announce/wish-good-luck/modal-wish-good-luck.component';
import { ModalWithdrawComponent } from './components/modals/modals-profile/withdraw/modal-withdraw.component';
import { SummaryAnnounceComponent } from './components/announce/summary-announce/summary-announce.component';
import { FooterComponent } from './components/commun/footer/footer.component';
import { TimerComponent } from './components/announce/timer/timer/timer.component';
import { SvgAddToFavoritesComponent } from './shared/libs/ux-ui/SVGs/add-to-favorites/svg-add-to-favorites.component';
import { SvgSearchComponent } from './shared/libs/ux-ui/SVGs/svg-search/svg-search.component';
// Libs
import { HeaderComponent } from './shared/libs/ux-ui/header/header.component';
import { InputComponent } from './shared/libs/ux-ui/forms/input/input.component';
import { BtnCtaFullComponent } from './shared/libs/ux-ui/buttons/btn-cta-full/btn-cta-full.component';
// Services
import { AnnouncesService } from './services/announce/announces.service';
import { AuthService } from './services/auth/auth.service';
import { UploadImgService } from './services/upload/upload-img.service';

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
    /* canActivate: [AuthGuardService], */ component: ProfileComponent,
  },
  {
    path: 'liste/:id',
    /* canActivate: [AuthGuardService], */ component: DetailPageComponent,
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
    CardComponent,
    ListItemsComponent,
    SignUpComponent,
    AddFormComponent,
    DetailPageComponent,
    ModalBuyTickectComponent,
    ProfileComponent,
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
    TimerComponent,
    SvgAddToFavoritesComponent,
    SvgSearchComponent,
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
