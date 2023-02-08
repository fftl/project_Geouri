package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Snapshot;
import com.ssafy.SmartMirror.repository.SnapshotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SnapshotService {
    private SnapshotRepository snapshotRepository;
    @Autowired
    public SnapshotService(SnapshotRepository snapshotRepository) {
        this.snapshotRepository = snapshotRepository;
    }

    public Snapshot saveSnapShot(Member member, String created, String imgUrl){
        Snapshot snapshot = Snapshot.builder()
                .created(created)
                .imgUrl(imgUrl)
                .member(member)
                .build();

        Snapshot save = snapshotRepository.save(snapshot);
        return save;
    }
}
