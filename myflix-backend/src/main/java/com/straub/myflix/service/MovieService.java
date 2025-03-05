package com.straub.myflix.service;

import com.straub.myflix.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.url}")
    private String apiUrl;

    @Autowired
    private WebClient webClient;


    public ApiResponse getTopRatedMovies(int page) {
        String rawResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/top_rated")
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println("Raw TMDb Response: " + rawResponse);

        //deserialize into ApiResponse
        ApiResponse apiResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/top_rated")
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .block();

        return apiResponse;
    }

    public ApiResponse getTrendingMovies(String timeWindow, int page) {
        final String timeWindowToUse = (!timeWindow.equals("day") && !timeWindow.equals("week"))
                ? "day" : timeWindow;

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/trending/movie/" + timeWindowToUse)
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .block();
    }

    public MovieDetailDto getMovieDetails(int movieId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/" + movieId)
                        .queryParam("api_key", apiKey)
                        .queryParam("append_to_response", "credits,videos,images")
                        .build())
                .retrieve()
                .bodyToMono(MovieDetailDto.class)
                .block();
    }

    public GenreListDto getGenres() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/genre/movie/list")
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(GenreListDto.class)
                .block();
    }

    public ApiResponse searchMovies(String query, int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/movie")
                        .queryParam("api_key", apiKey)
                        .queryParam("query", query)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .block();
    }

}
