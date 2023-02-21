package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Message;
import com.ssafy.SmartMirror.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    //메시지를 등록합니다.
    public Message addMessage(String messageKeyFrom, String messageKeyTo, String nameFrom, String nameTo,String content){
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String insertTime = formatter.format(date);

        Message insertMessage = Message.builder()
                .memberKeyFrom(messageKeyFrom)
                .memberKeyTo(messageKeyTo)
                .content(content)
                .nameFrom(nameFrom)
                .nameTo(nameTo)
                .time(insertTime)
                .build();

        Message saveMessage = messageRepository.save(insertMessage);

        return saveMessage;
    }

    //받은 멤버키 기준으로 모든 메시지를 가져온 뒤 읽지않은 메시지만 찾아냅니다.
    public List<Message> getMessage(String memberKeyTo){
        List<Message> getMessage = messageRepository.findAllByMemberKeyTo(memberKeyTo);
        List<Message> checkMessage = new ArrayList<>();

        for (int i = 0; i < getMessage.size(); i++) {
            if(getMessage.get(i).isRead_or_not()) continue;
            checkMessage.add(getMessage.get(i));
        }

        return checkMessage;
    }

    //messageKey를 가지고 message 객체를 가져와 읽음 처리 합니다.
    public boolean readCheck(Long messageKey){
        Message getMessage = messageRepository.findById(messageKey).orElse(null);
        if(getMessage == null) { return false; }
        else{
            getMessage.readMessage();
            messageRepository.save(getMessage);
            return true;
        }
    }
}
