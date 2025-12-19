package com.countryreports.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "species_accumulation")
public class SpeciesAccumulation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String countryCode;
    
    @Column(nullable = false)
    private String countryName;
    
    private String lastModified;
    
    @OneToMany(mappedBy = "speciesAccumulation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaxonomicGroupAccumulation> taxonomicGroups = new ArrayList<>();
    
    // Constructors
    public SpeciesAccumulation() {}
    
    public SpeciesAccumulation(String countryCode, String countryName, String lastModified) {
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.lastModified = lastModified;
    }
    
    // Helper methods
    public void addTaxonomicGroup(TaxonomicGroupAccumulation group) {
        taxonomicGroups.add(group);
        group.setSpeciesAccumulation(this);
    }
    
    public void removeTaxonomicGroup(TaxonomicGroupAccumulation group) {
        taxonomicGroups.remove(group);
        group.setSpeciesAccumulation(null);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCountryCode() {
        return countryCode;
    }
    
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
    
    public String getCountryName() {
        return countryName;
    }
    
    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
    
    public String getLastModified() {
        return lastModified;
    }
    
    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }
    
    public List<TaxonomicGroupAccumulation> getTaxonomicGroups() {
        return taxonomicGroups;
    }
    
    public void setTaxonomicGroups(List<TaxonomicGroupAccumulation> taxonomicGroups) {
        this.taxonomicGroups = taxonomicGroups;
    }
}
