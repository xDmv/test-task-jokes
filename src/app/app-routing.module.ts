import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListJokesComponent } from './pages/list-jokes/list-jokes.component';
import { DetailJokeComponent } from './pages/detail-joke/detail-joke.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: ListJokesComponent },
  { path: 'joke/:id', component: DetailJokeComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
