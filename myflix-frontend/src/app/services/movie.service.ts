import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Movie {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  }
  
  export interface ApiResponse {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
  }

  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface GenreListResponse {
    genres: Genre[];
  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class MovieService {
    private apiUrl = 'http://localhost:8080/api/movies';
  
    constructor(private http: HttpClient) {}
  
    getTopRatedMovies(page: number = 1): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}/top-rated?page=${page}`);
    }
    
    getTrendingMovies(timeWindow: string = 'day', page: number = 1): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}/trending?timeWindow=${timeWindow}&page=${page}`);
    }

    getMovieDetails(id: number): Observable<Movie> {
      return this.http.get<Movie>(`${this.apiUrl}/detail/${id}`);
    }
    
    getGenres(): Observable<GenreListResponse> {
      return this.http.get<GenreListResponse>(`${this.apiUrl}/genres`);
    }
    
    searchMovies(query: string, page: number = 1): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}&page=${page}`);
    }
    
    // addToFavorites(movieId: number): Observable<any> {
    //   return this.http.post(`${this.apiUrl}/favorites`, { movieId });
    // }
    
    // getFavorites(): Observable<ApiResponse> {
    //   return this.http.get<ApiResponse>(`${this.apiUrl}/favorites`);
    // }
  }