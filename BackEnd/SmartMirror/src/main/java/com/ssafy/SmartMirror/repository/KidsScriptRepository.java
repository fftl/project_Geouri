package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.KidsScript;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KidsScriptRepository extends JpaRepository<KidsScript, Long> {
}
