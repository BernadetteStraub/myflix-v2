package com.straub.myflix.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)  //ignore unknown fields
public record MovieDto(boolean adult,
                       @JsonAlias("backdrop_path") String backdropPath,
                       @JsonAlias("genre_ids") List<Integer> genreIds,
                       Integer id,
                       @JsonAlias("original_language") String originalLanguage,
                       @JsonAlias("original_title") String originalTitle,
                       String overview,
                       Double popularity,
                       @JsonAlias("poster_path") String posterPath,
                       @JsonAlias("release_date") String releaseDate,
                       String title,
                       Boolean video,
                       @JsonAlias("vote_average") Double voteAverage,
                       @JsonAlias("vote_count") Integer voteCount) {
}
