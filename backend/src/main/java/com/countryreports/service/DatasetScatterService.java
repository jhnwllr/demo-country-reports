package com.countryreports.service;

import com.countryreports.model.DatasetScatter;
import com.countryreports.repository.DatasetScatterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DatasetScatterService {
    
    @Autowired
    private DatasetScatterRepository datasetScatterRepository;
    
    public List<DatasetScatter> getAllDatasetScatter() {
        return datasetScatterRepository.findAll();
    }
    
    public Optional<DatasetScatter> getDatasetScatterById(Long id) {
        return datasetScatterRepository.findById(id);
    }
    
    public Optional<DatasetScatter> getDatasetScatterByCountryCode(String countryCode) {
        return datasetScatterRepository.findByCountryCode(countryCode.toUpperCase());
    }
    
    public List<String> getAvailableCountryCodes() {
        return datasetScatterRepository.findAll().stream()
                .map(DatasetScatter::getCountryCode)
                .toList();
    }
    
    public boolean hasDatasetData(String countryCode) {
        return datasetScatterRepository.existsByCountryCode(countryCode.toUpperCase());
    }
    
    @Transactional
    public DatasetScatter createDatasetScatter(DatasetScatter datasetScatter) {
        return datasetScatterRepository.save(datasetScatter);
    }
    
    @Transactional
    public DatasetScatter updateDatasetScatter(Long id, DatasetScatter datasetScatterDetails) {
        DatasetScatter datasetScatter = datasetScatterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DatasetScatter not found with id: " + id));
        
        datasetScatter.setCountryCode(datasetScatterDetails.getCountryCode());
        datasetScatter.setCountryName(datasetScatterDetails.getCountryName());
        datasetScatter.setTotalDatasets(datasetScatterDetails.getTotalDatasets());
        datasetScatter.setLastModified(datasetScatterDetails.getLastModified());
        datasetScatter.setDataSource(datasetScatterDetails.getDataSource());
        datasetScatter.setNotes(datasetScatterDetails.getNotes());
        
        // Update datasets
        datasetScatter.getDatasets().clear();
        datasetScatterDetails.getDatasets().forEach(datasetScatter::addDatasetPoint);
        
        return datasetScatterRepository.save(datasetScatter);
    }
    
    @Transactional
    public void deleteDatasetScatter(Long id) {
        datasetScatterRepository.deleteById(id);
    }
}
