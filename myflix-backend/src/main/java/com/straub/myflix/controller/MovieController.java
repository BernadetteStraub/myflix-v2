package com.straub.myflix.controller;

import com.straub.myflix.dto.ApiResponse;
import com.straub.myflix.dto.GenreDto;
import com.straub.myflix.dto.GenreListDto;
import com.straub.myflix.dto.MovieDetailDto;
import com.straub.myflix.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    //or @RequiredArgs and final?
    @Autowired
    private MovieService movieService;

    @GetMapping("/top-rated")
    public ApiResponse getTopRatedMovies(@RequestParam(defaultValue = "1") int page) {
        return movieService.getTopRatedMovies(page);
    }

    @GetMapping("/trending")
    public ResponseEntity<ApiResponse> getTrendingMovies(
            @RequestParam(defaultValue = "day") String timeWindow,
            @RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(movieService.getTrendingMovies(timeWindow, page));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<MovieDetailDto> getMovieDetails(
            @PathVariable int id) {
        MovieDetailDto movie = movieService.getMovieDetails(id);
        return ResponseEntity.ok(movie);
    }

    @GetMapping("/genres")
    public ResponseEntity<GenreListDto> getGenres() {
        GenreListDto genres = movieService.getGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchMovies(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(movieService.searchMovies(query, page));
    }
}
