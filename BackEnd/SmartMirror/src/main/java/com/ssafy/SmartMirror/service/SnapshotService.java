package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Snapshot;
import com.ssafy.SmartMirror.repository.SnapshotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class SnapshotService {

    private SnapshotRepository snapshotRepository;

    @Autowired
    public SnapshotService(SnapshotRepository snapshotRepository) {
        this.snapshotRepository = snapshotRepository;
    }

    /** 사진 저장하기 */
    public Snapshot saveSnapShot(Member member, String created, String imgUrl){
        Snapshot snapshot = Snapshot.builder()
                .created(created)
                .imgUrl(imgUrl)
                .member(member)
                .build();

        Snapshot save = snapshotRepository.save(snapshot);
        return save;
    }

    /** 유저 사진 전부 가져오기 */
    public List<Snapshot> getAllSnapShot(Member member){
        return snapshotRepository.findAllByMemberOrderByCreatedDesc(member);
    }

    /** 유저 사진 1주일치 가져오기 */
    public List<Snapshot> getWeekSnapShot(Member member){
        List<Snapshot> allSnapShot = snapshotRepository.findAllByMemberOrderByCreatedDesc(member);
        List<Snapshot> returnSnapShot = new ArrayList<>();
        LocalDate localDate = LocalDate.now();
        LocalDate startDate = localDate.minusDays(6L);

        if(allSnapShot.isEmpty()) return null;

        for (int i = 0; i < allSnapShot.size(); i++) {
            Snapshot snapshot = allSnapShot.get(i);
            String imgDate = snapshot.getCreated().split(" ")[0];
            LocalDate thisDate = LocalDate.parse(imgDate, DateTimeFormatter.ISO_DATE);

            if(thisDate.compareTo(startDate) >= 0){
                returnSnapShot.add(snapshot);
            } else {
                break;
            }
        }

        return returnSnapShot;
    }
}
