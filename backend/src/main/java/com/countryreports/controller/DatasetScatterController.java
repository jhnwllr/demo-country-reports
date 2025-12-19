package com.countryreports.controller;

import com.countryreports.model.DatasetScatter;
import com.countryreports.service.DatasetScatterService;
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
@RequestMapping("/api/dataset-scatter")
@Tag(name = "Dataset Scatter Plot", description = "Biodiversity dataset scatter plot data management APIs")
public class DatasetScatterController {
    
    @Autowired
    private DatasetScatterService datasetScatterService;
    
    @Operation(summary = "Get all dataset scatter data", description = "Retrieve dataset scatter plot data for all countries")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    @GetMapping
    public ResponseEntity<List<DatasetScatter>> getAllDatasetScatter() {
        return ResponseEntity.ok(datasetScatterService.getAllDatasetScatter());
    }
    
    @Operation(summary = "Get dataset scatter data by ID", description = "Retrieve specific dataset scatter data by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved data"),
        @ApiResponse(responseCode = "404", description = "Data not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<DatasetScatter> getDatasetScatterById(
            @Parameter(description = "ID of the dataset scatter data") @PathVariable Long id) {
        return datasetScatterService.getDatasetScatterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Get dataset scatter data by country code", 
               description = "Retrieve dataset scatter plot data for a specific country (AU, BW, CO, DK)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved data"),
        @ApiResponse(responseCode = "404", description = "Data not found for country")
    })
    @GetMapping("/country/{countryCode}")
    public ResponseEntity<DatasetScatter> getDatasetScatterByCountryCode(
            @Parameter(description = "2-letter country code (e.g., AU, BW, CO, DK)") @PathVariable String countryCode) {
        return datasetScatterService.getDatasetScatterByCountryCode(countryCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Get available country codes", 
               description = "Retrieve list of all country codes that have dataset scatter data")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved country codes")
    @GetMapping("/available-countries")
    public ResponseEntity<List<String>> getAvailableCountryCodes() {
        return ResponseEntity.ok(datasetScatterService.getAvailableCountryCodes());
    }
    
    @Operation(summary = "Check if data exists for country", 
               description = "Check whether dataset scatter data exists for a specific country code")
    @ApiResponse(responseCode = "200", description = "Successfully checked")
    @GetMapping("/has-data/{countryCode}")
    public ResponseEntity<Boolean> hasDatasetData(
            @Parameter(description = "2-letter country code") @PathVariable String countryCode) {
        return ResponseEntity.ok(datasetScatterService.hasDatasetData(countryCode));
    }
    
    @Operation(summary = "Create new dataset scatter data", 
               description = "Add new dataset scatter plot data for a country")
    @ApiResponse(responseCode = "201", description = "Data created successfully")
    @PostMapping
    public ResponseEntity<DatasetScatter> createDatasetScatter(
            @Parameter(description = "Dataset scatter data to create") @RequestBody DatasetScatter datasetScatter) {
        DatasetScatter created = datasetScatterService.createDatasetScatter(datasetScatter);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @Operation(summary = "Update dataset scatter data", 
               description = "Update existing dataset scatter plot data")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Data updated successfully"),
        @ApiResponse(responseCode = "404", description = "Data not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<DatasetScatter> updateDatasetScatter(
            @Parameter(description = "ID of the data to update") @PathVariable Long id,
            @Parameter(description = "Updated dataset scatter data") @RequestBody DatasetScatter datasetScatter) {
        try {
            DatasetScatter updated = datasetScatterService.updateDatasetScatter(id, datasetScatter);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(summary = "Delete dataset scatter data", 
               description = "Remove dataset scatter plot data from the system")
    @ApiResponse(responseCode = "204", description = "Data deleted successfully")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatasetScatter(
            @Parameter(description = "ID of the data to delete") @PathVariable Long id) {
        datasetScatterService.deleteDatasetScatter(id);
        return ResponseEntity.noContent().build();
    }
}
