import { Component, OnInit } from '@angular/core';
import { MovieService, ApiResponse, Movie } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  genres: { [id: number]: string } = {};
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieService.getGenres().subscribe({
      next: (genreList) => {
        this.genres = genreList.genres.reduce((map: { [id: number]: string }, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
        
        this.loadMovieDetails();
      },
      error: (err) => {
        console.error('Error fetching genres', err);
        this.error = 'Failed to load genre information.';
        this.loadMovieDetails();
      }
    });
  }

  loadMovieDetails(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          throw new Error('Movie ID is required');
        }
        return this.movieService.getMovieDetails(+id);
      })
    ).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching movie details', err);
        this.error = 'Failed to load movie details. Please try again later.';
        this.loading = false;
      }
    });
  }

  getGenreName(id: number): string {
    return this.genres[id] || 'Unknown';
  }

  getImageUrl(path: string | null): string {
    if (!path) return 'assets/images/no-poster.jpg';
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  getBackdropUrl(path: string | null): string {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/original${path}`;
  }

}
