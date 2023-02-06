package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CalendarRepository extends JpaRepository<Calendar, String> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Calendar c SET c.link = :link where c.memberKey = :memberKey")
    int updateLink(String link, String memberKey);
}
