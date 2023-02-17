package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.HandWashing;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.repository.BrushingRepository;
import com.ssafy.SmartMirror.repository.HandWashingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HandWashingService {
    private HandWashingRepository handWashingRepository;

    @Autowired
    public HandWashingService(HandWashingRepository handWashingRepository) {
        this.handWashingRepository = handWashingRepository;
    }

    /**
     * 해당 member의 handWashingTime을 기록합니다.
     * @param member
     * @param handWashingTime
     * @return
     */
    public int saveHandWashing(Member member, String handWashingTime) {
        // 저장할 HandWashing 객체 새로 생성
        HandWashing handWashing = HandWashing.builder()
                .handWashingTime(handWashingTime)
                .member(member)
                .build();
        // HandWashingRepository를 이용해서 DB에 insert한 뒤
        // 저장된 handWashing 객체 반환
        HandWashing response = handWashingRepository.save(handWashing);
        //reseponse 의 key값을 int로 변환하여 반환!
        return response.getHandWashingKey().intValue();
    }

    /**
     * 해당 멤버의 모든 손씻기 기록을 반환합니다.
     * @param member
     * @return
     */
    public List<HandWashing> findAllByMember(Member member){
        List<HandWashing> handWashingList = handWashingRepository.findAllByMember(member);
        return handWashingList;
    }

    /**
     * 해당 멤버의 손씻기 기록 중 시간이 date로 시작하는 손씻기 기록을 모두 반환합니다.
     * @param member
     * @param date
     * @return
     */
    public List<HandWashing> findAllByMemberAndHandWashingTimeStartingWith(Member member, String date){
        List<HandWashing> handWashingList = handWashingRepository.findAllByMemberAndHandWashingTimeStartingWith(member, date);
        return handWashingList;
    }

    /**
     * 해당 멤버의 손씻기 기록 중 시간이 date로 시작하는 손씻기 기록의 수를 반환합니다.
     * @param member
     * @param date
     * @return
     */
    public int countAllByMemberAndHandWashingTimeStartingWith(Member member, String date) {
        List<HandWashing> handWashingList = handWashingRepository.findAllByMemberAndHandWashingTimeStartingWith(member, date);
        if(handWashingList == null) return 0;
        return handWashingList.size();
    }
}
