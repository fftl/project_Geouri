package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
