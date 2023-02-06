package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, String> {
}
