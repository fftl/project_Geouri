package com.ssafy.SmartMirror.talk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @Autowired
    AuthService authService;

    @Autowired
    CustomMessageService customMessageService;

    @GetMapping("/")
    public String serviceStart(String code) throws JSONException {
        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendMyMessage();
            return "메시지 전송 성공";
        }else {
            return "토큰발급 실패";
        }
    }
}