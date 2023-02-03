package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Visit;
import com.ssafy.SmartMirror.repository.BrushingRepository;
import com.ssafy.SmartMirror.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrushingService {

    private BrushingRepository brushingRepository;
    private MemberRepository memberRepository;

    @Autowired
    public BrushingService(BrushingRepository brushingRepository, MemberRepository memberRepository) {
        this.brushingRepository = brushingRepository;
        this.memberRepository = memberRepository;
    }

    /**
     * brushingTime 과 해당 member 기록
     * @param member
     * @param brushingTime
     * @return
     */
    public int saveBrushing(Member member, String brushingTime) {
        // 저장할 Brushing 객체 새로 생성
        Brushing brushing = Brushing.builder()
                .brushingTime(brushingTime)
                .member(member)
                .build();

        // BrushingRepository를 이용해서 DB에 insert한 뒤
        // 저장된 Brushing 객체 반환
        Brushing response = brushingRepository.save(brushing);
        //reseponse 의 key값을 int로 변환하여 반환!
        return response.getBrushingKey().intValue();
    }

    public List<Brushing> findAllByMember(Long memberKey){
        System.out.println("test1");
        Member member = memberRepository.findById(memberKey).get();
        List<Brushing> brushingList = brushingRepository.findAllByMember(member);
        System.out.println("test2");
        return brushingList;
    }
}
