package com.straub.myflix.dto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GenreListDto(
        List<GenreDto> genres
) {
}
