package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Visit;
import com.ssafy.SmartMirror.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

    private VisitRepository visitRepository;

    @Autowired
    public VisitService(VisitRepository visitRepository){
        this.visitRepository = visitRepository;
    }

    /**
     * visitTime 과 해당 member 기록
     * @param member
     * @param visitTime
     * @return
     */
    public int saveVisit(Member member, String visitTime) {
        // 저장할 Visit 객체 새로 생성
        Visit visit = Visit.builder()
                .visitTime(visitTime)
                .member(member)
                .build();

        // VisitRepository를 이용해서 DB에 insert한 뒤
        // 저장된 VisitScript 객체 반환
        Visit response = visitRepository.save(visit);
        //reseponse 의 key값을 int로 변환하여 반환!
        return response.getVisitKey().intValue();
    }
}