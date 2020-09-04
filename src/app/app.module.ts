import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListJokesComponent } from './pages/list-jokes/list-jokes.component';
import { DetailJokeComponent } from './pages/detail-joke/detail-joke.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/list-jokes/components/list/list.component';
import { ApiService } from './services/api.service';
import { PaginationComponent } from './pages/list-jokes/components/pagination/pagination.component';
import { PaginationService } from './services/pagination.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ListJokesComponent,
    DetailJokeComponent,
    NotFoundComponent,
    ListComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
  ],
  providers: [ApiService, PaginationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
