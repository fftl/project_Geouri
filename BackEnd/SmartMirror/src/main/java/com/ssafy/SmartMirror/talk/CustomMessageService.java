package com.ssafy.SmartMirror.talk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class CustomMessageService {

    @Autowired
    MessageService messageService;

    public boolean sendMyMessage() throws JSONException {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setObjType("text");
        myMsg.setText("우리 아이가 하루 세 번 양치를 완료했어요!!\n" +
                "기특한 우리 아이에게 칭찬을 해주세요!^^");
        myMsg.setBtnTitle("사진첩 보기");
        myMsg.setWebUrl("http://www.naver.com");
        myMsg.setMobileUrl("http://www.naver.com");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }


}