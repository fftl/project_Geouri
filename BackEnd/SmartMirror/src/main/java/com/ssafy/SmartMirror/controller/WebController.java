package com.ssafy.SmartMirror.controller;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/web")

public class WebController {


    public ResponseEntity signUp() {
        return null;
    }



    // 이메일 인증번호 전송
    public ResponseEntity sendEmailToken(RequestEntity requestEntity) {
        return null;
    }
}