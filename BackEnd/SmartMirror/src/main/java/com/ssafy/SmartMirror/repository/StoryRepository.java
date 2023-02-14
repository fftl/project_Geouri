package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
