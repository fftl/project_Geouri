package com.ssafy.SmartMirror.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.config.Test;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.News;
import com.ssafy.SmartMirror.domain.User;
import com.ssafy.SmartMirror.dto.RequestInfo;
import com.ssafy.SmartMirror.dto.ResponseDefault;
import com.ssafy.SmartMirror.dto.ResponseMember;
import com.ssafy.SmartMirror.dto.ResponseNews;
import com.ssafy.SmartMirror.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/web")

public class WebController {

    private UserService userService;
    private Test test;

    @Autowired
    public WebController(UserService userService, Test test) {
        this.userService = userService;
        this.test = test;
    }

    //    @PostMapping("/member")
//    public ResponseEntity readMember(@RequestBody RequestInfo info) throws IOException


    /**
     * 해당 유저가 가지고 있는 멤버 리스트 반환
     * @param userKey
     * @return
     */
    @GetMapping("/memberlist")
    public ResponseEntity getMemberList(@RequestParam String userKey) {
        ResponseDefault responseDefault = null; // response 객체 생성

        // 해당 유저 있는지 확인
        if(!test.isValidAccess(userKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        
        User user = userService.findByUserKey(userKey); // 유저키에 해당하는 유저 가져오기
        List<Member> memberList = user.getMemberList(); // 해당 유저에 연결된 멤버리스트 가져오기

        System.out.println("사이즈 "+memberList.size());
        
        List<ResponseMember> responseMemberList = new ArrayList<>(); // 멤버리스트를 응답 dto로 변경
        for (Member member : memberList) {
            responseMemberList.add(ResponseMember.builder()
                    .memberKey(member.getMemberKey())
                    .imgUrl(member.getImgUrl())
                    .nickname(member.getNickname())
                    .build());
        }


        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("")
                .data(responseMemberList)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }
}