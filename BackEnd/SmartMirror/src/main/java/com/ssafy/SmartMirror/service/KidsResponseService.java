package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.KidsResponse;
import com.ssafy.SmartMirror.repository.KidsResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KidsResponseService {

    private KidsResponseRepository kidsResponseRepository;

    @Autowired
    public KidsResponseService(KidsResponseRepository kidsResponseRepository) {
        this.kidsResponseRepository = kidsResponseRepository;
    }

    //조건을 가지고 이번에 응답이 가능한 응답 리스트를 가져옵니다.
    public List<KidsResponse> getKidsResponse(Long reqKey, int reaction, int resType){
        System.out.println("log - getKidsResponse > 메소드 실행 !!");
        System.out.println("log - reqKey >> " + reqKey +" reaction >> " + reaction +" type >> " + resType);
        List<KidsResponse> kidsResponseList = kidsResponseRepository.findAllByReqKeyAndReactionAndResType(reqKey, reaction, resType);
        System.out.println("log - getKidsResponse > 메소드 종료 !!");
        return kidsResponseList;
    }

}
