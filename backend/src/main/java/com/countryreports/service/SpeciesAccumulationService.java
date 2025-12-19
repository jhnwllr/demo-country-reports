package com.countryreports.service;

import com.countryreports.model.SpeciesAccumulation;
import com.countryreports.repository.SpeciesAccumulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SpeciesAccumulationService {
    
    @Autowired
    private SpeciesAccumulationRepository repository;
    
    @Transactional(readOnly = true)
    public List<SpeciesAccumulation> getAllSpeciesAccumulation() {
        return repository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<SpeciesAccumulation> getSpeciesAccumulationById(Long id) {
        return repository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public Optional<SpeciesAccumulation> getSpeciesAccumulationByCountryCode(String countryCode) {
        return repository.findByCountryCodeWithDetails(countryCode);
    }
    
    @Transactional
    public SpeciesAccumulation createSpeciesAccumulation(SpeciesAccumulation speciesAccumulation) {
        return repository.save(speciesAccumulation);
    }
    
    @Transactional
    public SpeciesAccumulation updateSpeciesAccumulation(Long id, SpeciesAccumulation updatedData) {
        return repository.findById(id)
            .map(existing -> {
                existing.setCountryCode(updatedData.getCountryCode());
                existing.setCountryName(updatedData.getCountryName());
                existing.setLastModified(updatedData.getLastModified());
                
                // Clear existing taxonomic groups and add new ones
                existing.getTaxonomicGroups().clear();
                updatedData.getTaxonomicGroups().forEach(existing::addTaxonomicGroup);
                
                return repository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("SpeciesAccumulation not found with id: " + id));
    }
    
    @Transactional
    public void deleteSpeciesAccumulation(Long id) {
        repository.deleteById(id);
    }
}
