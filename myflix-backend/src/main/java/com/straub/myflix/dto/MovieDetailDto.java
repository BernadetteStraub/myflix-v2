package com.straub.myflix.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MovieDetailDto (
        boolean adult,
        @JsonAlias("backdrop_path") String backdropPath,
        Integer budget,
        List<GenreDto> genres,  //different from genre_ids in MovieDto
        Integer id,
        @JsonAlias("imdb_id") String imdbId,
        @JsonAlias("original_language") String originalLanguage,
        @JsonAlias("original_title") String originalTitle,
        String overview,
        Double popularity,
        @JsonAlias("poster_path") String posterPath,
        @JsonAlias("release_date") String releaseDate,
        Long revenue,
        Integer runtime,
        String status,
        String tagline,
        String title,
        Boolean video,
        @JsonAlias("vote_average") Double voteAverage,
        @JsonAlias("vote_count") Integer voteCount
) {
}
