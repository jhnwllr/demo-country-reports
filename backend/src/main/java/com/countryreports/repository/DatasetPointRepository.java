package com.countryreports.repository;

import com.countryreports.model.DatasetPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatasetPointRepository extends JpaRepository<DatasetPoint, String> {
}
