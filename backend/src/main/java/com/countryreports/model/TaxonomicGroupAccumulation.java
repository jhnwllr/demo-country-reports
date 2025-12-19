package com.countryreports.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "taxonomic_group_accumulation")
public class TaxonomicGroupAccumulation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "group_name", nullable = false)
    private String group;
    
    private Integer totalSpecies;
    
    private Long totalOccurrences;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "species_accumulation_id")
    @JsonIgnore
    private SpeciesAccumulation speciesAccumulation;
    
    @OneToMany(mappedBy = "taxonomicGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AccumulationDataPoint> data = new HashSet<>();
    
    // Constructors
    public TaxonomicGroupAccumulation() {}
    
    public TaxonomicGroupAccumulation(String group, Integer totalSpecies, Long totalOccurrences) {
        this.group = group;
        this.totalSpecies = totalSpecies;
        this.totalOccurrences = totalOccurrences;
    }
    
    // Helper methods
    public void addDataPoint(AccumulationDataPoint dataPoint) {
        data.add(dataPoint);
        dataPoint.setTaxonomicGroup(this);
    }
    
    public void removeDataPoint(AccumulationDataPoint dataPoint) {
        data.remove(dataPoint);
        dataPoint.setTaxonomicGroup(null);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getGroup() {
        return group;
    }
    
    public void setGroup(String group) {
        this.group = group;
    }
    
    public Integer getTotalSpecies() {
        return totalSpecies;
    }
    
    public void setTotalSpecies(Integer totalSpecies) {
        this.totalSpecies = totalSpecies;
    }
    
    public Long getTotalOccurrences() {
        return totalOccurrences;
    }
    
    public void setTotalOccurrences(Long totalOccurrences) {
        this.totalOccurrences = totalOccurrences;
    }
    
    public SpeciesAccumulation getSpeciesAccumulation() {
        return speciesAccumulation;
    }
    
    public void setSpeciesAccumulation(SpeciesAccumulation speciesAccumulation) {
        this.speciesAccumulation = speciesAccumulation;
    }
    
    public Set<AccumulationDataPoint> getData() {
        return data;
    }
    
    public void setData(Set<AccumulationDataPoint> data) {
        this.data = data;
    }
}
