package com.countryreports.controller;

import com.countryreports.model.SpeciesAccumulation;
import com.countryreports.service.SpeciesAccumulationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/species-accumulation")
@Tag(name = "Species Accumulation", description = "API for species accumulation curve data")
public class SpeciesAccumulationController {
    
    @Autowired
    private SpeciesAccumulationService service;
    
    @GetMapping
    @Operation(summary = "Get all species accumulation data")
    public ResponseEntity<List<SpeciesAccumulation>> getAllSpeciesAccumulation() {
        return ResponseEntity.ok(service.getAllSpeciesAccumulation());
    }
    
    @GetMapping("/country/{countryCode}")
    @Operation(summary = "Get species accumulation data by country code")
    public ResponseEntity<SpeciesAccumulation> getSpeciesAccumulationByCountryCode(@PathVariable String countryCode) {
        return service.getSpeciesAccumulationByCountryCode(countryCode)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.ok().body(null));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get species accumulation data by ID")
    public ResponseEntity<SpeciesAccumulation> getSpeciesAccumulationById(@PathVariable Long id) {
        return service.getSpeciesAccumulationById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Create new species accumulation data")
    public ResponseEntity<SpeciesAccumulation> createSpeciesAccumulation(@RequestBody SpeciesAccumulation speciesAccumulation) {
        // Set bi-directional relationships
        speciesAccumulation.getTaxonomicGroups().forEach(group -> {
            group.setSpeciesAccumulation(speciesAccumulation);
            group.getData().forEach(dataPoint -> dataPoint.setTaxonomicGroup(group));
        });
        
        SpeciesAccumulation created = service.createSpeciesAccumulation(speciesAccumulation);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update species accumulation data")
    public ResponseEntity<SpeciesAccumulation> updateSpeciesAccumulation(
            @PathVariable Long id, 
            @RequestBody SpeciesAccumulation speciesAccumulation) {
        
        // Set bi-directional relationships
        speciesAccumulation.getTaxonomicGroups().forEach(group -> {
            group.setSpeciesAccumulation(speciesAccumulation);
            group.getData().forEach(dataPoint -> dataPoint.setTaxonomicGroup(group));
        });
        
        try {
            SpeciesAccumulation updated = service.updateSpeciesAccumulation(id, speciesAccumulation);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete species accumulation data")
    public ResponseEntity<Void> deleteSpeciesAccumulation(@PathVariable Long id) {
        service.deleteSpeciesAccumulation(id);
        return ResponseEntity.noContent().build();
    }
}
