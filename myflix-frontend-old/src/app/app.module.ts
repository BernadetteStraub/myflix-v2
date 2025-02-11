import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import { ServerModule } from '@angular/platform-server';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TopMoviesComponent,
    // Declare other components here
  ],
  imports: [
    BrowserModule,
    ServerModule,
    HttpClientModule,
    CommonModule
    // Import other modules if needed
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }