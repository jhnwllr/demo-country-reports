package com.countryreports.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dataset_scatter_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Dataset scatter plot data for a country containing biodiversity datasets")
public class DatasetScatter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier", example = "1")
    private Long id;
    
    @Column(nullable = false, unique = true, length = 2)
    @Schema(description = "2-letter country code", example = "AU", required = true)
    private String countryCode;
    
    @Column(nullable = false)
    @Schema(description = "Full country name", example = "Australia", required = true)
    private String countryName;
    
    @Column(nullable = false)
    @Schema(description = "Total number of datasets", example = "3485", required = true)
    private Integer totalDatasets;
    
    @Schema(description = "Date when data was last modified", example = "2025-10-22")
    private LocalDate lastModified;
    
    @Schema(description = "Source of the data", example = "GBIF")
    private String dataSource;
    
    @Column(columnDefinition = "TEXT")
    @Schema(description = "Additional notes about the data", 
            example = "Biodiversity datasets from Australia institutions and GBIF network")
    private String notes;
    
    @OneToMany(mappedBy = "datasetScatter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Schema(description = "List of individual dataset points")
    private List<DatasetPoint> datasets = new ArrayList<>();
    
    public void addDatasetPoint(DatasetPoint datasetPoint) {
        datasets.add(datasetPoint);
        datasetPoint.setDatasetScatter(this);
    }
    
    public void removeDatasetPoint(DatasetPoint datasetPoint) {
        datasets.remove(datasetPoint);
        datasetPoint.setDatasetScatter(null);
    }
}
