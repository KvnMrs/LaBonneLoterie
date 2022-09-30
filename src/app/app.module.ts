import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddItemComponent } from './components/add-item/add-item.component';

// services
import { AnouncesService } from './services/anounces.service'

const appRoutes : Routes = [
  { path: '', component: AuthComponent },
  { path: 'liste', component: ListItemsComponent },
  { path: 'ajout-annonce', component: AddItemComponent },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NgForm, AnouncesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
