package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
