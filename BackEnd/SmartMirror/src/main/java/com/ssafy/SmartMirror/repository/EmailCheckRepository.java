package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.EmailCheck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailCheckRepository extends JpaRepository<EmailCheck, Long> {
    EmailCheck findByEmail(String email);
}
