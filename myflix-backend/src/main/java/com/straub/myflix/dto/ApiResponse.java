package com.straub.myflix.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)  //ignore unknown fields
public record ApiResponse(int page,
                          List<MovieDto> results,
                          @JsonAlias("total_pages") int totalPages,
                          @JsonAlias("total_results") int totalResults) {
}
