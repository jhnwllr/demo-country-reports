package com.countryreports.controller;

import com.countryreports.model.Country;
import com.countryreports.service.CountryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@Tag(name = "Countries", description = "Country information management APIs")
public class CountryController {
    
    @Autowired
    private CountryService countryService;
    
    @Operation(summary = "Get all countries", description = "Retrieve a list of all countries")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
    
    @Operation(summary = "Get country by ID", description = "Retrieve a specific country by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved country"),
        @ApiResponse(responseCode = "404", description = "Country not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(
            @Parameter(description = "ID of the country to retrieve") @PathVariable Long id) {
        return countryService.getCountryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Get country by code", description = "Retrieve a country by its 2-letter code (e.g., AU, BW, CO, DK)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved country"),
        @ApiResponse(responseCode = "404", description = "Country not found")
    })
    @GetMapping("/code/{code}")
    public ResponseEntity<Country> getCountryByCode(
            @Parameter(description = "2-letter country code") @PathVariable String code) {
        return countryService.getCountryByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Create a new country", description = "Add a new country to the system")
    @ApiResponse(responseCode = "201", description = "Country created successfully")
    @PostMapping
    public ResponseEntity<Country> createCountry(
            @Parameter(description = "Country object to create") @RequestBody Country country) {
        Country createdCountry = countryService.createCountry(country);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCountry);
    }
    
    @Operation(summary = "Update a country", description = "Update an existing country's information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Country updated successfully"),
        @ApiResponse(responseCode = "404", description = "Country not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Country> updateCountry(
            @Parameter(description = "ID of the country to update") @PathVariable Long id,
            @Parameter(description = "Updated country object") @RequestBody Country country) {
        try {
            Country updatedCountry = countryService.updateCountry(id, country);
            return ResponseEntity.ok(updatedCountry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(summary = "Delete a country", description = "Remove a country from the system")
    @ApiResponse(responseCode = "204", description = "Country deleted successfully")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(
            @Parameter(description = "ID of the country to delete") @PathVariable Long id) {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }
}
