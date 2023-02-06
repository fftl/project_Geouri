package com.ssafy.SmartMirror.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.config.Test;
import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.service.*;
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
    private KidsScriptService kidsScriptService;
    private KidsResponseService kidsResponseService;
    private MemberService memberService;
    private MirrorService mirrorService;
    private WidgetService widgetService;
    private PlaylistService playlistService;
    private CalendarService calendarService;
    private RegionService regionService;
    private BrushingService brushingService;
    private FireBaseService fireBaseService;
    private VisitService visitService;
    private NewsService newsService;
    private Test test;

    @Autowired
    public WebController(UserService userService, KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, BrushingService brushingService, FireBaseService fireBaseService, VisitService visitService, NewsService newsService, Test test) {
        this.userService = userService;
        this.kidsScriptService = kidsScriptService;
        this.kidsResponseService = kidsResponseService;
        this.memberService = memberService;
        this.mirrorService = mirrorService;
        this.widgetService = widgetService;
        this.playlistService = playlistService;
        this.calendarService = calendarService;
        this.regionService = regionService;
        this.brushingService = brushingService;
        this.fireBaseService = fireBaseService;
        this.visitService = visitService;
        this.newsService = newsService;
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
        if(!test.isValidUserKey(userKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        
        User user = userService.findByUserKey(userKey); // 유저키에 해당하는 유저 가져오기
        List<Member> memberList = user.getMemberList(); // 해당 유저에 연결된 멤버리스트 가져오기

        System.out.println("사이즈 "+memberList.size());
        
        List<ResponseMember> responseMemberListdto = new ArrayList<>(); // 멤버리스트를 응답 dto로 변경
        for (Member member : memberList) {
            responseMemberListdto.add(ResponseMember.builder()
                    .memberKey(member.getMemberKey())
                    .imgUrl(member.getImgUrl())
                    .nickname(member.getNickname())
                    .build());
        }

        ResponseMemberList responseMemberList = ResponseMemberList.builder()
                .memberList(responseMemberListdto)
                .build();
        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("")
                .data(responseMemberList)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }



    /**
     * 해당 멤버의 위젯 정보(여부, 링크, 지역) 반환
     * @param memberKey
     * @return
     */
    @GetMapping("/member")
    public ResponseEntity getWidget(@RequestParam String memberKey) {
        ResponseDefault responseDefault = null;

        // 해당 멤버 있는지 확인
        if(!test.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }


        // 멤버 정보 가져오기
        Member member = memberService.findByMemberKey(memberKey);

        // 위젯
        Widget widget = widgetService.findByMemberKey(memberKey);

        // 플레이리스트
        String playlist = playlistService.findByMemberKey(memberKey);

        // 지역
        DongCode dongCode = regionService.findByMemberKey(memberKey);

        // 캘린더
        String calendar = calendarService.findByMemberKey(memberKey);

        // responseDto 꾸리기
        ResponseWidget responseWidget = ResponseWidget.builder()
                .news(widget.isNews())
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


        ResponseMember responseMember = ResponseMember.builder()
                .memberKey(member.getMemberKey())
                .nickname(member.getNickname())
                .imgUrl(member.getImgUrl())
                .playlist(playlist)
                .calender(calendar)
                .kidsMode(member.isKidsMode())
                .widget(responseWidget)
                .region(responseRegion)
                .build();


        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("")
                .data(responseMember)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    /**
     * 위젯 정보(show 여부, 링크, 지역 정보)
     * @param requestWidget
     * @return
     */
    @PutMapping("/widget")
    public ResponseEntity updateWidget(@RequestBody RequestWidget requestWidget) {
        ResponseDefault responseDefault = null;

        // 멤버키 유효성 확인
        String memberKey = requestWidget.getMemberKey();
        if(!test.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음)",HttpStatus.OK);
        }

        String cmd = requestWidget.getCmd();
        String value = requestWidget.getValue();

        int res = 0;

        // 아이모드(kidsMode), 재생목록(playlist), 뉴스/기사(news), 캘린더(calendar), 재생목록링크(playlistLink), 캘린더링크(calendarLink), 지역(region)
        switch(cmd) {
            case "kidsMode":
                res = memberService.updateKidsMode(value, memberKey);
                break;
            case "playlist":
                res = widgetService.updatePlaylist(value, memberKey);
                break;
            case "news":
                res = widgetService.updateNews(value, memberKey);
                break;
            case "calendar":
                res = widgetService.updateCalender(value, memberKey);
                break;
            case "playlistLink":
                res = playlistService.updateLink(value, memberKey);
                break;
            case "calendarLink":
                res = calendarService.updateLink(value, memberKey);
                break;
//            case "region":
//                res = memberService.updateRegion(value, memberKey);
//                break;
        }

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    /**
     * 해당 멤버가 해당 월에 실시한 양치 횟수를 31 길이의 리스트에 저장하여 출력합니다.
     * @param memberKey
     * @param year
     * @param month
     * @return
     */
    @GetMapping("/brushlog")
    public ResponseEntity getBrushLog(@RequestParam String memberKey, String year, String month) {
        ResponseDefault responseDefault = null;

        // 해당 멤버 있는지 확인
        if(!test.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        // 해당 멤버의 브러쉬 기록 중 year, month 에 해당하는 양치기록을 가져온다
        int[] brushlog = new int[31];
        String searchMonth = year+"-"+month;

        List<Brushing> brushinglog = brushingService.findAllByMemberAndBrushingTimeStartingWith(memberKey, searchMonth);
        for (Brushing log : brushinglog) {
            String[] date = log.getBrushingTime().split(" ");
            String[] days = date[0].split("-");
            int day = Integer.parseInt(days[2]);

            brushlog[day]++;
        }

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("")
                .data(brushlog)
                .build();
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }
}