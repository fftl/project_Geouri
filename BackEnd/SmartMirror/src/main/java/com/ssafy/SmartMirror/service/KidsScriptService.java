package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.KidsScript;
import com.ssafy.SmartMirror.repository.KidsScriptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KidsScriptService {

    private KidsScriptRepository kidsScriptRepository;
    @Autowired
    public KidsScriptService(KidsScriptRepository kidsScriptRepository) {
        this.kidsScriptRepository = kidsScriptRepository;
    }

    //어린이 스크립트 추가하기
    public int saveKidsScript(String script){
        //KidsScript 객체를 새로 생성
        KidsScript kidsScript = KidsScript.builder()
                .script(script)
                .build();

        //kidsScriptRepository를 이용해서 DB에 insert한 뒤
        //저장 된 KidsScript 객체 반환
        KidsScript response = kidsScriptRepository.save(kidsScript);

        //reseponse 의 key값을 int로 변환하여 반환!
        return response.getScriptKey().intValue();
    }

    //어린이 스크립트 조회하기
    public KidsScript getKidsScript(Long scriptKey){
        System.out.println("getKidsScript, scriptKey >> " +scriptKey);
        KidsScript kidsScript = kidsScriptRepository.findById(scriptKey).get();
        return kidsScript;
    }
}
