import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';

const routes: Routes = [
  { path: '', component: TopMoviesComponent },
  // { path: 'feed/:type', component: FeedComponent },
  { path: '**', component: TopMoviesComponent },  // Wildcard route for a 404 page redirects to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
