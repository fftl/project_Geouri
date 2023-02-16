package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    public List<Visit> findByMemberOrderByVisitKeyDesc(Member member);
}
