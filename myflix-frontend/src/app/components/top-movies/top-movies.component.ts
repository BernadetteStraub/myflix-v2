import { Component, OnInit } from '@angular/core';
import { MovieService, ApiResponse, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrl: './top-movies.component.scss'
})
export class TopMoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage: number = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies(this.currentPage);
  }


  loadMovies(page: number): void {
    this.movieService.getTopRatedMovies(page).subscribe(
      (response) => {
        console.log('Movies fetched:', response.results);  // Log the full response
        response.results.forEach(movie => {
          console.log('Movie posterPath:', movie.posterPath);  // Log each movie's posterPath
        });
        this.movies = response.results;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  getImageUrl(path: string): string {
    console.log('Image path:', path);
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
  
  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.loadMovies(this.currentPage);
  //   }
  // }
  
  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.loadMovies(this.currentPage);
  //   }
  // }
}
