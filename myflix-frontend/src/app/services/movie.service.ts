import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Movie {
    // Define the fields based on your DTO
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
  
  @Injectable({
    providedIn: 'root', // This makes the service available application-wide
  })
  export class MovieService {
    private apiUrl = 'http://localhost:8080/api/movies';
  
    constructor(private http: HttpClient) {}
  
    getTopRatedMovies(page: number = 1): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}/top-rated?page=${page}`);
    }
  }