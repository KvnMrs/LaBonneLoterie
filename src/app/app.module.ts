import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CardItemComponent } from './card-item/card-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './add-item/add-item.component';

// services
import { AnouncesService } from './services/anounces.service'

@NgModule({
  declarations: [
    // Components
    AppComponent,
    NavigationComponent,
    CardItemComponent,
    ListItemsComponent,
    HomeComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'liste', component: ListItemsComponent },
      { path: 'ajout-annonce', component: AddItemComponent },
    ])
  ],
  providers: [NgForm, AnouncesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
