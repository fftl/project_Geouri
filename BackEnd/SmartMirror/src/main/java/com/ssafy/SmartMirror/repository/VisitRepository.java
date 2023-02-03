package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Long> {
}
