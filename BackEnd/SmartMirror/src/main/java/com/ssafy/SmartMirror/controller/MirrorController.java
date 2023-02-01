package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.service.KidsScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mirror")
@RestController
public class MirrorController {

    private KidsScriptService kidsScriptService;

    @Autowired
    public MirrorController(KidsScriptService kidsScriptService) {
        this.kidsScriptService = kidsScriptService;
    }

    @PostMapping("/kidsScript/insert")
    public int insertKidsScript(@RequestParam("script") String script){
        System.out.println(script);
        int res = kidsScriptService.saveKidsScript(script);
        return res;
    }
}
