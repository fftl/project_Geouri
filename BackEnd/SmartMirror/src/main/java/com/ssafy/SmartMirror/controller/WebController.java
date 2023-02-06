package com.ssafy.SmartMirror.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.dto.RequestInfo;
import com.ssafy.SmartMirror.dto.ResponseDefault;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.Random;

@RestController
@RequestMapping("/web")

public class WebController {


//    @PostMapping("/member")
//    public ResponseEntity readMember(@RequestBody RequestInfo info) throws IOException

//    @GetMapping("/member")
//    public ResponseEntity getMemberList(@RequestParam)

}