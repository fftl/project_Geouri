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
    public List<KidsResponse> getKidsResponse(Long reqKey, int reaction){
        List<KidsResponse> kidsResponseList = kidsResponseRepository.findAllByReqKeyAndReaction(reqKey, reaction);
        return kidsResponseList;
    }

    //양치 제안, 손씻기 제안에 대한 구분을 주기 위한 조회입니다.
    public List<KidsResponse> getKidsResponseSelect(Long reqKey, int reaction, int type){
        List<KidsResponse> kidsResponseList = kidsResponseRepository.findAllByReqKeyAndReactionAndResType(reqKey, reaction, type);
        return kidsResponseList;
    }

    //능동적인 양치 시작, 손씻기 시작을 위한 조회입니다.
    public List<KidsResponse> getKidsStart(int reaction, int type){
        List<KidsResponse> kidsResponseList = kidsResponseRepository.findAllByReactionAndResType(reaction, type+1);
        return kidsResponseList;
    }
}
