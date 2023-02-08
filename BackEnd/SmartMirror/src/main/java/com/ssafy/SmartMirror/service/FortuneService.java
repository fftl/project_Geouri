package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Fortune;
import com.ssafy.SmartMirror.domain.Mirror;
import com.ssafy.SmartMirror.repository.FortuneRepository;
import com.ssafy.SmartMirror.repository.MirrorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

@Service
public class FortuneService {
    private FortuneRepository fortuneRepository;
    @Autowired
    public FortuneService(FortuneRepository fortuneRepository) {
        this.fortuneRepository = fortuneRepository;
    }

    public String getFortune(String memberKey) {

        // 오늘 날짜와 멤버키를 조합하여 키 생성
        Long key = 0l;

        String test = LocalDate.now().toString(); // 2023-06-12
        for (int i = 0; i < test.length(); i++) {
            key += test.charAt(i);
        }
        for (int i = 0; i < memberKey.length(); i++) {
            key += memberKey.charAt(i);
        }

        // 포춘 DB 의 개수
        long length = fortuneRepository.count();
        System.out.println("포춘 len : "+length);
        key %= length;

        Fortune fortune = fortuneRepository.findById(key).orElse(null);

        return fortune.getSentence();
    }

}
