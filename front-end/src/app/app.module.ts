import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './users/lists/lists/lists.component';
import { ListComponent } from './users/lists/list/list.component';
import { PlaceholderListComponent } from './users/placeholder-list/placeholder-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListComponent,
    PlaceholderListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
