package com.countryreports.service;

import com.countryreports.model.Country;
import com.countryreports.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    
    @Autowired
    private CountryRepository countryRepository;
    
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }
    
    public Optional<Country> getCountryById(Long id) {
        return countryRepository.findById(id);
    }
    
    public Optional<Country> getCountryByCode(String code) {
        return countryRepository.findByCode(code);
    }
    
    public Country createCountry(Country country) {
        return countryRepository.save(country);
    }
    
    public Country updateCountry(Long id, Country countryDetails) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found with id: " + id));
        
        country.setCode(countryDetails.getCode());
        country.setName(countryDetails.getName());
        country.setDescription(countryDetails.getDescription());
        
        return countryRepository.save(country);
    }
    
    public void deleteCountry(Long id) {
        countryRepository.deleteById(id);
    }
}
