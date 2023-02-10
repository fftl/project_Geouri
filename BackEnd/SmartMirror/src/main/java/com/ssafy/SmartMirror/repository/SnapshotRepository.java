package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.AdultScript;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Snapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SnapshotRepository extends JpaRepository<Snapshot, Long> {
    List<Snapshot> findAllByMemberOrderByCreatedDesc(Member member);
}
