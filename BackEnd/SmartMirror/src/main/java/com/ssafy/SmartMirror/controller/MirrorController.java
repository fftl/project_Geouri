package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.config.ScriptDetail;
import com.ssafy.SmartMirror.config.Utils;
import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.font.Script;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequestMapping("/mirror")
@RestController
public class MirrorController {

    static final int START = 0;         // 시작
    static final int MORNING = 1;       // 오전
    static final int AFTERNOON = 2;     // 오후
    static final int EVENING = 3;       // 저녁
    static final int ALLTIME = 4;       // 평시
    static final int BRUSHING_ASK = 5;  // 양치 제안
    static final int BRUSHING_START = 6;// 양치 시작
    static final int HADN_ASK = 7;      // 손씻기 제안
    static final int HAND_START = 8;    // 손씻기 시작

    private KidsScriptService kidsScriptService;
    private KidsResponseService kidsResponseService;
    private MemberService memberService;
    private MirrorService mirrorService;
    private WidgetService widgetService;
    private PlaylistService playlistService;
    private CalendarService calendarService;
    private RegionService regionService;
    private DongCodeService dongCodeService;
    private BrushingService brushingService;
    private FireBaseService fireBaseService;
    private VisitService visitService;
    private NewsService newsService;
    private SnapshotService snapshotService;
    private QuizService quizService;
    private FortuneService fortuneService;
    private ScriptDetail scriptDetail;
    private Utils utils;

    @Autowired
    public MirrorController(KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, DongCodeService dongCodeService, BrushingService brushingService, FireBaseService fireBaseService, VisitService visitService, NewsService newsService, SnapshotService snapshotService, QuizService quizService, FortuneService fortuneService, ScriptDetail scriptDetail, Utils utils) {
        this.kidsScriptService = kidsScriptService;
        this.kidsResponseService = kidsResponseService;
        this.memberService = memberService;
        this.mirrorService = mirrorService;
        this.widgetService = widgetService;
        this.playlistService = playlistService;
        this.calendarService = calendarService;
        this.regionService = regionService;
        this.dongCodeService = dongCodeService;
        this.brushingService = brushingService;
        this.fireBaseService = fireBaseService;
        this.visitService = visitService;
        this.newsService = newsService;
        this.snapshotService = snapshotService;
        this.quizService = quizService;
        this.fortuneService = fortuneService;
        this.scriptDetail = scriptDetail;
        this.utils = utils;
    }

    /* ***************************** Script ***************************** */

    /**
     * 거울 앞의 사람과 상호작용하는 멘트를 리턴합니다.
     * @param requestGetScript
     * @return
     */
    @PostMapping("/getScript")
    public ResponseEntity getScript(@RequestBody RequestGetScript requestGetScript) {
        ResponseDefault responseDefault = null;

        // 유저키와 시리얼 넘버를 가져와 유효한 요청인지 확인합니다.
        String serialNumber = requestGetScript.getSerialNumber();
        String memberKey = requestGetScript.getMemberKey();
        Long reqkey = requestGetScript.getReqKey();
        int reaction = requestGetScript.getReaction();
        int type = requestGetScript.getType();

        if(!utils.isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        // 유저의 정보를 가져옵니다.
        Member getMember = memberService.findByMemberKey(requestGetScript.getMemberKey());

        // 요청이 도착한 현재 시간을 파악해놓습니다.
        LocalDateTime now = LocalDateTime.now();
        String strDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        //Return을 위한 객체
        KidsScript kidsScript = null;
        AdultScript adultScript = null;
        ResponseScript responseScript = null;

        // 유저가 어린이 Member 라면!
        if (getMember.isKidsMode()) {
            /** 첫 질문이라면(START)라면 */
            if (requestGetScript.getReqKey() == START && requestGetScript.getReaction() == 0 && requestGetScript.getType() == 0) {

                kidsScript = scriptDetail.getHelloScript(now, getMember, reqkey, reaction);

            /** 첫 질문이 아닐 때 START가 아닐 때! */
            } else {

                /** 전 멘트 타입이 인사(1~4) 이고 그에 대한 대답이 긍정이었을 경우, 양치 여부를 판단하여 제안으로 감 */
                if( requestGetScript.getType() <= 4 && requestGetScript.getReaction() == 1 ) {

                    //현재 어린이의 양치기록들을 모두 가져온 뒤 가장 최근값 즉 마지막 인덱스 기록을 가져옵니다.
                    List<Brushing> brushingList = brushingService.findAllByMember(requestGetScript.getMemberKey());
                    kidsScript = scriptDetail.getAskScript(now, getMember, reqkey, reaction, brushingList);

                    /** 양치 제안에 대한 응답이 아까 양치 했어! 일 경우 */
                } else if ( requestGetScript.getType() == 5 && requestGetScript.getReaction() == 2){

                    kidsScript = scriptDetail.getBasicScript(reqkey, reaction);

                    //외부에서 양치를 한 경우에 양치기록을 추가합니다 (type == 1)
                    brushingService.saveBrushing(getMember, strDate, 1);

                    /** 기본 화면에서 능동적인 양치 시작, 손씻기 시작  */
                } else if ( (requestGetScript.getReaction() == 1 && requestGetScript.getType() == 5) || (requestGetScript.getReaction() == 1 && requestGetScript.getType() == 7)){

                    kidsScript = scriptDetail.getStartScript(reqkey, reaction, type);

                    /** 분기가 필요없는 멘트까지 도달!! */
                } else {

                    kidsScript = scriptDetail.getBasicScript(reqkey, reaction);
                }
            }

            //선택한 kidsScript를 가지고 resopnseDto를 만듭니다.
            responseScript = ResponseScript.builder()
                    .script(kidsScript.getScript())
                    .res_key(kidsScript.getScriptKey())
                    .type(kidsScript.getType())
                    .build();


        } /** 어린이 타입 종료 !! */

        /** 어른이라면 */
        if (!getMember.isKidsMode()) {

            /* responseScript = ResponseScript.builder()
                    .script(adultScript.getScript())
                    .res_key(adultScript.getScriptKey())
                    .type(kidsScript.getType())
                    .build(); */

            responseScript = ResponseScript.builder()
                    .script("어른의 스크립트는 아직 준비되지 않았어요!")
                    .res_key(0L)
                    .type(0)
                    .build();

        } /** 어른 타입 종료 !! */

        responseDefault = ResponseDefault.builder()
                .success(true)
                .data(responseScript)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    /***
     * 무작위 퀴즈 하나를 반환하는 요청입니다.
     * @param requestInfo
     * @return
     */
    @PostMapping("/getQuiz")
    public ResponseEntity getQuiz(@RequestBody RequestInfo requestInfo){
        ResponseDefault responseDefault = null;

        if(!utils.isValidAccess(requestInfo.getSerialNumber(), requestInfo.getMemberKey())) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        Quiz quiz = quizService.getOneQuiz();

        if(quiz == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("quiz 데이터가 존재하지 않습니다.")
                    .data(null)
                    .build();
        } else {
            ResponseQuiz responseQuiz = ResponseQuiz.builder()
                    .question(quiz.getQuestion())
                    .hint(quiz.getHint())
                    .answer(quiz.getAnswer())
                    .build();

            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(responseQuiz)
                    .build();
        }

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    /* ***************************** Member ***************************** */

    /**
     * 거울에 등장한 멤버의 정보를 리턴합니다(멤버 기본정보, 위젯 설정)
     * @param info
     * @return
     */
    @PostMapping("/member")
    public ResponseEntity getMember(@RequestBody RequestInfo info) throws IOException {
        ResponseDefault responseDefault = null; // response 객체 생성

        // 거울 시리얼 넘버와 멤버키 유효성 확인
        String serialNumber = info.getSerialNumber();
        String memberKey = info.getMemberKey();
        if(!utils.isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        // 멤버 정보 가져오기
        Member member = memberService.findByMemberKey(memberKey); // 멤버
        Widget widget = widgetService.findByMemberKey(memberKey); // 위젯
        String playlist = playlistService.findByMemberKey(memberKey); // 플레이리스트

        // 지역 정보
        String dongCode = dongCodeService.findByMemberKey(memberKey);
        Region region = regionService.findByDongCode(dongCode);

        // 캘린더
        String calendar = calendarService.findByMemberKey(memberKey);
        // 캘린더 링크 접속 후 파싱 필요 !!!

        // 뉴스
        List<News> newsList = newsService.findByPress("YTN");
        List<ResponseNews> responseNewsList = new ArrayList<>();
        for (News news : newsList) {
            responseNewsList.add(ResponseNews.builder()
                    .press(news.getPress())
                    .title(news.getTitle())
                    .build());
        }

        // 포춘
        String fortune = fortuneService.getFortune(memberKey);

        // 방문기록 저장
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String visitTime = formatter.format(date);
        visitService.saveVisit(member, visitTime);


        // responseDto 꾸리기
        ResponseWidget responseWidget = ResponseWidget.builder()
                .news(widget.isNews())
                .calender(widget.isCalender())
                .playlist(widget.isPlaylist())
                .build();

//        ResponseRegion responseRegion = ResponseRegion.builder()
//                .sidoName(region.getSidoName())
//                .gugunName(region.getGugunName())
//                .dongName(region.getDongName())
//                .lat(region.getLat())
//                .lng(region.getLng())
//                .build();

        ResponseMember responseMember = ResponseMember.builder()
                .memberKey(member.getMemberKey())
                .nickname(member.getNickname())
                .birth(member.getBirth())
                .kidsMode(member.isKidsMode())
                .widget(responseWidget)
                .playlist(playlist)
                .calender(calendar)
//                .region(responseRegion)
                .news(responseNewsList)
                .fortune(fortune)
                .build();

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("성공")
                .data(responseMember)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    /***
     *
     * @param insertSnapShot
     * @return
     */
    @PostMapping("/snapShot")
    public ResponseEntity insertSnapShot(RequestInsertSnapShot insertSnapShot) throws IOException {

        // response 객체 생성
        ResponseDefault responseDefault = null;
        if(!utils.isValidAccess(insertSnapShot.getSerialNumber(), insertSnapShot.getMemberKey())) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)", HttpStatus.OK);
        }

        // memberKey에 해당하는 Member를 가져옵니다.
        Member getMember = memberService.findByMemberKey(insertSnapShot.getMemberKey());
        if (getMember == null) return new ResponseEntity("유저가 존재하지 않음!", HttpStatus.OK);

        // fireBaseService.uploadFiles()를 통해서 firebase storage에 파일을 업로드하고 해당 파일에 대한 접근 url을
        // url에 담습니다.
        String url = fireBaseService.uploadFiles(insertSnapShot.getImgFile(), insertSnapShot.getImgName());

        // 사진 저장 시간을 서버시간 기준으로 만들어냅니다.
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String snapShotTime = formatter.format(date);

        // snapShot을 DB에 입력합니다.
        Snapshot result = snapshotService.saveSnapShot(getMember, snapShotTime, url);

        // 모두가 성공적으로 입력이 되었다면 DB에 입력합니다.
        responseDefault = ResponseDefault.builder()
                .success(true)
                .data(result.getImgUrl())
                .msg(null)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


}
