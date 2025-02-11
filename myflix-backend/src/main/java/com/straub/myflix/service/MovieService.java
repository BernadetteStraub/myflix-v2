package com.straub.myflix.service;

import com.straub.myflix.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.url}")
    private String apiUrl;

    @Autowired
    private WebClient webClient;

//    public ApiResponse getTopRatedMovies(int page) {
//        try {
//            ApiResponse response = webClient.get()
//                    .uri(uriBuilder -> uriBuilder
//                            .path("/movie/top_rated")
//                            .queryParam("api_key", apiKey)
//                            .queryParam("page", page)
//                            .build())
//                    .retrieve()
//                    .bodyToMono(ApiResponse.class)
//                    .block();
//
//            // Log the response
//            System.out.println("TMDb API Response: " + response);
//            return response;
//        } catch (Exception e) {
//            // Log the error
//            System.err.println("Error fetching data from TMDb: " + e.getMessage());
//            e.printStackTrace();  // Log the full stack trace for debugging
//            throw new RuntimeException("Failed to fetch top-rated movies", e);
//        }
//    }

    public ApiResponse getTopRatedMovies(int page) {
        String rawResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/top_rated")
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(String.class)  // Get the raw response as String
                .block();

        System.out.println("Raw TMDb Response: " + rawResponse);  // Log the raw response

        // Now, deserialize into ApiResponse
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
}
