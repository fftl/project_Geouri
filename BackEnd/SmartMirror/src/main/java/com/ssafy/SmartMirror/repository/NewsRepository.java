package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
