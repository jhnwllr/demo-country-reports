package com.countryreports.repository;

import com.countryreports.model.DatasetScatter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatasetScatterRepository extends JpaRepository<DatasetScatter, Long> {
    Optional<DatasetScatter> findByCountryCode(String countryCode);
    boolean existsByCountryCode(String countryCode);
}
