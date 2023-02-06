package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
}
