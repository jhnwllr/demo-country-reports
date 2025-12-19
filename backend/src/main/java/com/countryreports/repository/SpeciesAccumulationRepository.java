package com.countryreports.repository;

import com.countryreports.model.SpeciesAccumulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpeciesAccumulationRepository extends JpaRepository<SpeciesAccumulation, Long> {
    
    @Query("SELECT DISTINCT sa FROM SpeciesAccumulation sa " +
           "LEFT JOIN FETCH sa.taxonomicGroups " +
           "WHERE sa.countryCode = :countryCode")
    Optional<SpeciesAccumulation> findByCountryCodeWithDetails(@Param("countryCode") String countryCode);
    
    Optional<SpeciesAccumulation> findByCountryCode(String countryCode);
}
