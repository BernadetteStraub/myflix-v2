import { Component, OnInit } from '@angular/core';
import { MovieService, ApiResponse, Movie } from '../../services/movie.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;
  error: string | null = null;
  timeWindow: string = 'day';
  currentPage: number = 1;
  totalPages: number = 0;
  isSearching = false;
  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  private readonly genres: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();

    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term.trim()) {
        this.performSearch(term);
      } else if (this.isSearching) {
        this.isSearching = false;
        this.loadMovies();
      }
    });
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getTrendingMovies(this.timeWindow, this.currentPage)
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching trending movies', err);
          this.error = 'Failed to load trending movies. Please try again later.';
          this.loading = false;
        }
      });
  }

  search(term: string): void {
    this.searchTerm = term.trim();
    this.searchTerms.next(this.searchTerm);
  }

  performSearch(query: string): void {
    this.isSearching = true;
    this.loading = true;
    this.currentPage = 1;
    
    this.movieService.searchMovies(query, this.currentPage)
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching movies', err);
          this.error = 'Failed to search movies. Please try again later.';
          this.loading = false;
        }
      });
  }

  clearSearch(input: HTMLInputElement): void {
    input.value = '';
    this.searchTerm = '';
    this.isSearching = false;
    this.loadMovies();
  }

  toggleTimeWindow(): void {
    this.timeWindow = this.timeWindow === 'day' ? 'week' : 'day';
    this.currentPage = 1;
    this.loadMovies();
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.isSearching) {
        this.movieService.searchMovies(this.searchTerm, this.currentPage)
          .subscribe({
            next: (response) => {
              this.movies = response.results;
              this.loading = false;
            },
            error: (err) => {
              console.error('Error fetching next page of search results', err);
              this.error = 'Failed to load more results. Please try again.';
              this.loading = false;
            }
          });
      } else {
        this.loadMovies();
      }
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.isSearching) {
        this.movieService.searchMovies(this.searchTerm, this.currentPage)
          .subscribe({
            next: (response) => {
              this.movies = response.results;
              this.loading = false;
            },
            error: (err) => {
              console.error('Error fetching previous page of search results', err);
              this.error = 'Failed to load more results. Please try again.';
              this.loading = false;
            }
          });
      } else {
        this.loadMovies();
      }
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  getMainGenre(genreId: number): string {
    return genreId in this.genres ? this.genres[genreId] : 'Unknown';
  }

}
