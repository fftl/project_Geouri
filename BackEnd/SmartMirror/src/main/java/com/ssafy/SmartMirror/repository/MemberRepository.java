package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface MemberRepository extends JpaRepository<Member, String> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Member m SET m.kidsMode = :value where m.memberKey = :memberKey")
    int updateKidsMode(boolean value, String memberKey);


    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Member m SET m.noticeMode = :value where m.memberKey = :memberKey")
    int updateNoticeMode(boolean value, String memberKey);
}
