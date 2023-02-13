package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.EmailCheck;
import com.ssafy.SmartMirror.repository.EmailCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailCheckService {

    private EmailCheckRepository emailCheckRepository;

    @Autowired
    public EmailCheckService(EmailCheckRepository emailCheckRepository) {
        this.emailCheckRepository = emailCheckRepository;
    }

    //이메일과 난수를 통해 만들어낸 6자리의 인증키를 만들어냅니다.
    public Long saveEmailCheck(String email){

        //인증을 여러번 받을 경우를 대비하여 이미 EmailCheck 테이블에 이메일이 존재할 경우
        //해당 이메일에 덮어씌우는 방식을 사용했습니다.
        EmailCheck insertEmailCheck = null;
        EmailCheck getEmail = emailCheckRepository.findByEmail(email);

        String token = "";
        for (int i = 0; i < 6; i++) {
            token += (int)(Math.random()*10);
        }

        if(getEmail != null){
            insertEmailCheck = EmailCheck.builder()
                    .emailCheckKey(getEmail.getEmailCheckKey())
                    .email(email)
                    .token(token)
                    .build();
        } else {
            insertEmailCheck = EmailCheck.builder()
                    .email(email)
                    .token(token)
                    .build();
        }

        EmailCheck saveEmailCheck = emailCheckRepository.save(insertEmailCheck);
        return saveEmailCheck.getEmailCheckKey();
    }

    //이미 등록된 이메일을 통해서 EmailCheck 객체를 찾아냅니다.
    public EmailCheck confirmEmailCheck(String email){
        EmailCheck emailCheck = emailCheckRepository.findByEmail(email);
        return emailCheck;
    }
}
