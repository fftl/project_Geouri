package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.AdultScript;
import com.ssafy.SmartMirror.domain.KidsResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KidsResponseRepository extends JpaRepository<KidsResponse, Long> {
}
