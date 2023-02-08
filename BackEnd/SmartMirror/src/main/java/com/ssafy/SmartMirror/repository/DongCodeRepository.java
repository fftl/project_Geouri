package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.DongCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface DongCodeRepository extends JpaRepository<DongCode, String> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE DongCode d SET d.dongCode = :value where d.memberKey = :memberKey")
    int updateDongCode(String value, String memberKey);
}
