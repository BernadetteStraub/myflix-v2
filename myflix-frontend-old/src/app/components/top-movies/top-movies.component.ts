import { Component, OnInit } from '@angular/core';
import { MovieService, ApiResponse, Movie } from '../../core/services/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrl: './top-movies.component.scss'
})
export class TopMoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies(this.currentPage);
  }


  loadMovies(page: number): void {
    this.movieService.getTopRatedMovies(page).subscribe(
      (response) => {
        this.movies = response.results;
        this.currentPage = response.page;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies(this.currentPage);
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies(this.currentPage);
    }
  }
}
