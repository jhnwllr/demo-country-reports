package com.countryreports.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "accumulation_data_point")
public class AccumulationDataPoint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer year;
    
    private Integer cumulativeSpecies;
    
    private Integer effort;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taxonomic_group_id")
    @JsonIgnore
    private TaxonomicGroupAccumulation taxonomicGroup;
    
    // Constructors
    public AccumulationDataPoint() {}
    
    public AccumulationDataPoint(Integer year, Integer cumulativeSpecies, Integer effort) {
        this.year = year;
        this.cumulativeSpecies = cumulativeSpecies;
        this.effort = effort;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Integer getYear() {
        return year;
    }
    
    public void setYear(Integer year) {
        this.year = year;
    }
    
    public Integer getCumulativeSpecies() {
        return cumulativeSpecies;
    }
    
    public void setCumulativeSpecies(Integer cumulativeSpecies) {
        this.cumulativeSpecies = cumulativeSpecies;
    }
    
    public Integer getEffort() {
        return effort;
    }
    
    public void setEffort(Integer effort) {
        this.effort = effort;
    }
    
    public TaxonomicGroupAccumulation getTaxonomicGroup() {
        return taxonomicGroup;
    }
    
    public void setTaxonomicGroup(TaxonomicGroupAccumulation taxonomicGroup) {
        this.taxonomicGroup = taxonomicGroup;
    }
}
