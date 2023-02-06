package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.AdultScript;
import com.ssafy.SmartMirror.domain.Widget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface WidgetRepository  extends JpaRepository<Widget, String> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Widget w SET w.calender = :value where w.memberKey = :memberKey")
    int updateCalender(boolean value, String memberKey);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Widget w SET w.news = :value where w.memberKey = :memberKey")
    int updateNews(boolean value, String memberKey);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Widget w SET w.playlist = :value where w.memberKey = :memberKey")
    int updatePlaylist(boolean value, String memberKey);
}
