package com.straub.myflix.controller;

import com.straub.myflix.dto.ApiResponse;
import com.straub.myflix.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
