import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListJokesComponent } from './pages/list-jokes/list-jokes.component';
import { DetailJokeComponent } from './pages/detail-joke/detail-joke.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListPaginationComponent } from './pages/list-jokes/component/list-pagination/list-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ListJokesComponent,
    DetailJokeComponent,
    NotFoundComponent,
    ListPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
