package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Visit;
import com.ssafy.SmartMirror.repository.BrushingRepository;
import com.ssafy.SmartMirror.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrushingService {
    private BrushingRepository brushingRepository;
//    private MemberRepository memberRepository;

    @Autowired
    public BrushingService(BrushingRepository brushingRepository) {
        this.brushingRepository = brushingRepository;
    }

    /**
     * 해당 member의 brushingTime을 기록합니다.
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

    /**
     * 해당 멤버의 모든 양치기록을 반환합니다.
     * @param member
     * @return
     */
    public List<Brushing> findAllByMember(Member member){
        List<Brushing> brushingList = brushingRepository.findAllByMember(member);
        return brushingList;
    }

    /**
     * 해당 멤버의 양치기록 중 양치시간이 date로 시작하는 양치기록을 모두 반환합니다.
     * @param member
     * @param date
     * @return
     */
    public List<Brushing> findAllByMemberAndBrushingTimeStartingWith(Member member, String date){
        List<Brushing> brushingList = brushingRepository.findAllByMemberAndBrushingTimeStartingWith(member, date);
        return brushingList;
    }


    /**
     * 해당 멤버의 양치기록 중 양치시간이 date로 시작하는 양치기록의 수를 반환합니다.
     * @param member
     * @param date
     * @return
     */
    public int countAllByMemberAndBrushingTimeStartingWith(Member member, String date) {
        List<Brushing> brushingList = brushingRepository.findAllByMemberAndBrushingTimeStartingWith(member, date);
        if(brushingList == null) return 0;
        return brushingList.size();
    }
}
