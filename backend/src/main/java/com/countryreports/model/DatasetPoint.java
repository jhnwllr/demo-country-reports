package com.countryreports.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dataset_points",
       uniqueConstraints = @UniqueConstraint(columnNames = {"id", "dataset_scatter_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Individual dataset point with species and occurrence information")
public class DatasetPoint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Internal database ID", hidden = true)
    private Long pkId;
    
    @Column(nullable = false)
    @Schema(description = "Dataset identifier (UUID)", 
            example = "02abb9d1-7d81-42b3-ac9a-3b3d0c7a5280")
    private String id;
    
    @Column(nullable = false)
    @Schema(description = "Dataset name", example = "Fungimap", required = true)
    private String name;
    
    @Column(nullable = false)
    @Schema(description = "Number of species in dataset", example = "1474", required = true)
    private Integer species;
    
    @Column(nullable = false)
    @Schema(description = "Number of occurrences recorded", example = "148551", required = true)
    private Long occurrences;
    
    @Column(nullable = false)
    @Schema(description = "Whether dataset was published in the country", example = "true", required = true)
    private Boolean publishedInCountry;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dataset_scatter_id", nullable = false)
    @JsonBackReference
    @Schema(hidden = true)
    private DatasetScatter datasetScatter;
}
