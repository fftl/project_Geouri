package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.service.KidsScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/kidsScript")
@RestController
public class KidsScriptController {

    private KidsScriptService kidsScriptService;

    @Autowired
    public KidsScriptController(KidsScriptService kidsScriptService) {
        this.kidsScriptService = kidsScriptService;
    }

    @PostMapping("/insert")
    public int insertKidsScript(@RequestParam("script") String script){
        System.out.println(script);
        int res = kidsScriptService.saveKidsScript(script);
        return res;
    }
}
