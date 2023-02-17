package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.HandWashing;
import com.ssafy.SmartMirror.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HandWashingRepository extends JpaRepository<HandWashing, Long> {
    public List<HandWashing> findAllByMember(Member member);

    public List<HandWashing> findAllByMemberAndHandWashingTimeStartingWith(Member member, String date);

}
