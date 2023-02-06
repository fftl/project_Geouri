package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrushingRepository extends JpaRepository<Brushing, Long> {
    public List<Brushing> findAllByMember(Member member);
    public List<Brushing> findAllByMemberAndBrushingTimeStartingWith(Member member, String month);


}
