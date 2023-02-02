package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/mirror")
@RestController
public class MirrorController {

    private KidsScriptService kidsScriptService;
    private MemberService memberService;
    private MirrorService mirrorService;
    private WidgetService widgetService;
    private PlaylistService playlistService;
    private CalendarService calendarService;
    private RegionService regionService;
    private BrushingService brushingService;


    @Autowired
    public MirrorController(KidsScriptService kidsScriptService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, BrushingService brushingService) {
        this.kidsScriptService = kidsScriptService;
        this.memberService = memberService;
        this.mirrorService = mirrorService;
        this.widgetService = widgetService;
        this.playlistService = playlistService;
        this.calendarService = calendarService;
        this.regionService = regionService;
        this.brushingService = brushingService;
    }

    @PostMapping("/kidsScript/insert")
    public ResponseEntity insertKidsScript(@RequestParam("script") String script){
        ResponseDefault responseDefault = null;

        System.out.println(script);
        int res = kidsScriptService.saveKidsScript(script);

        responseDefault = ResponseDefault.builder()
                .success(true)
                .data(res)
                .build();

        return new ResponseEntity<>(responseDefault, HttpStatus.OK);
    }

    @PostMapping("/kids/getScript")
    public ResponseEntity kidsGetScript(@RequestBody RequestKidsGetScript kidsGetScriptDto){
        ResponseDefault reaspoDefault = null;
        System.out.println("test kid get Script 1 >>" + kidsGetScriptDto.getMemberKey());
        List<Brushing> allByMemberKey = brushingService.findAllByMember(kidsGetScriptDto.getMemberKey());
        System.out.println("test kid get Script 2");
        for (int i = 0; i < allByMemberKey.size(); i++) {
            System.out.println(allByMemberKey.get(i));
        }
        reaspoDefault = ResponseDefault.builder()
                .success(true)
                .msg(null)
                .data("test")
                .build();

        return new ResponseEntity<>(reaspoDefault, HttpStatus.OK);
    }

    /**
     *
      */
    @PostMapping("/member")
    public ResponseEntity readMember(@RequestBody RequestInfo info) {
        ResponseDefault responseDefault = null; // response 객체 생성

        String serialNumber = info.getSerialNumber();
        Long memberKey = info.getMemberKey();
        System.out.println("Serial Number : " + serialNumber);
        System.out.println("member key : " + memberKey);

        // 1. 거울 시리얼 넘버와 멤버키 유효성 확인
        // 거울 넘버에 연결된 계정 정보와 멤버키를 가진 계정 정보가 같은지 확인
        Member member = memberService.findByMemberKey(memberKey);
        if(member == null) { // 멤버키에 해당하는 멤버가 없다면
            System.out.println("멤버키 없음");
        }

        Mirror mirror = mirrorService.findBySerialNumber(serialNumber);
        if(mirror == null) { // 시리얼넘버에 해당하는 거울이 없다면
            System.out.println("시리얼넘버 없음");
        }

        if(mirror.getUser().getUserKey() != member.getUser().getUserKey()) { // 멤버와 거울이 같은 계정을 공유하는지 확인
            System.out.println("잘못된 접근");
        }

        // 2. 멤버 정보 가져오기
        System.out.println("성공!");

        // 위젯
        Widget widget = widgetService.findByMemberKey(memberKey);
        // 위젯 dto로 만들기


        // 플레이리스트
        String playlist = playlistService.findByMemberKey(memberKey);
        System.out.println(playlist);

        // 지역
        DongCode dongCode = regionService.findByMemberKey(memberKey);
        // 지역 dto 로 만들기

        // 캘린더
        String calendar = calendarService.findByMemberKey(memberKey);
        // 캘린더 링크 접속 후 파싱 필요 !!!
        System.out.println(calendar);

        // responseDto 꾸리기
        ResponseWidget responseWidget = ResponseWidget.builder()
                .news(widget.isNews())
                .shot(widget.isShot())
                .calender(widget.isCalender())
                .playlist(widget.isPlaylist())
                .build();

        ResponseRegion responseRegion = ResponseRegion.builder()
                .sidoName(dongCode.getSidoName())
                .gugunName(dongCode.getGugunName())
                .dongName(dongCode.getDongName())
                .lat(dongCode.getLat())
                .lng(dongCode.getLng())
                .build();

        ResponseInfo responseInfo = ResponseInfo.builder()
                .memberKey(member.getMemberKey())
                .nickname(member.getNickname())
                .birth(member.getBirth())
                .kidsMode(member.isKidsMode())
                .widget(responseWidget)
                .playlist(playlist)
                .calender(calendar)
                .region(responseRegion)
                .build();

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("성공")
                .data(responseInfo)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }
}
