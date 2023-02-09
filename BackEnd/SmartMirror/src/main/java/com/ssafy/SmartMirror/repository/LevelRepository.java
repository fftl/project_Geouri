package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LevelRepository extends JpaRepository<Level, String> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Level l SET l.exp = :exp where l.memberKey = :memberKey")
    int updateExp(int exp, String memberKey);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Level l SET l.lv = :lv where l.memberKey = :memberKey")
    int updateLv(int lv, String memberKey);
}
