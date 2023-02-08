package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Fortune;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FortuneRepository extends JpaRepository<Fortune, Long> {

}
