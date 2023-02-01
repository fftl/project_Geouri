package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.dto.ResponseDefault;
import com.ssafy.SmartMirror.dto.RequestKidsGetScript;
import com.ssafy.SmartMirror.service.BrushingService;
import com.ssafy.SmartMirror.service.KidsScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/mirror")
@RestController
public class MirrorController {

    private KidsScriptService kidsScriptService;
    private BrushingService brushingService;

    @Autowired
    public MirrorController(KidsScriptService kidsScriptService, BrushingService brushingService) {
        this.kidsScriptService = kidsScriptService;
        this.brushingService = brushingService;
    }

    //어린이 스크립트를 입력합니다.
    //script - 입력할 멘트
    @PostMapping("/kids/insertScript")
    public ResponseEntity kidsInsertScript(@RequestParam("script") String script){
        ResponseDefault defaultResponse = null;
        int res = kidsScriptService.saveKidsScript(script);

        defaultResponse = ResponseDefault.builder()
                .success(true)
                .data(res)
                .build();

        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/kids/getScript")
    public ResponseEntity kidsGetScript(@RequestBody RequestKidsGetScript kidsGetScriptDto){
        ResponseDefault defaultResponse = null;
        List<Brushing> allByMemberKey = brushingService.findAllByMemberKey(kidsGetScriptDto.getMemberKey());
        for (int i = 0; i < allByMemberKey.size(); i++) {
            System.out.println(allByMemberKey.get(i));
        }


        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }
}
