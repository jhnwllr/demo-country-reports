package com.countryreports.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "countries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Country information entity")
public class Country {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier", example = "1")
    private Long id;
    
    @Column(nullable = false, unique = true, length = 2)
    @Schema(description = "2-letter country code", example = "AU", required = true)
    private String code;
    
    @Column(nullable = false)
    @Schema(description = "Country name", example = "Australia", required = true)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    @Schema(description = "Country description", example = "Country report for Australia")
    private String description;
}
