package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface PlaylistRepository extends JpaRepository<Playlist, String> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Playlist p SET p.link = :link where p.memberKey = :memberKey")
    int updateLink(String link, String memberKey);
}
