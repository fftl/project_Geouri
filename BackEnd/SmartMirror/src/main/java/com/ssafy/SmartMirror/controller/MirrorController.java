package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.config.ScriptDetail;
import com.ssafy.SmartMirror.config.Utils;
import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.service.*;
import net.fortuna.ical4j.data.ParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private HandWashingService handWashingService;
    private FireBaseService fireBaseService;
    private VisitService visitService;
    private NewsService newsService;
    private SnapshotService snapshotService;
    private QuizService quizService;
    private FortuneService fortuneService;
    private ScriptDetail scriptDetail;
    private Utils utils;
    private LevelService levelService;
    private StoryService storyService;

    @Autowired
    public MirrorController(KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, DongCodeService dongCodeService, BrushingService brushingService, HandWashingService handWashingService, FireBaseService fireBaseService, VisitService visitService, NewsService newsService, SnapshotService snapshotService, QuizService quizService, FortuneService fortuneService, ScriptDetail scriptDetail, Utils utils, LevelService levelService, StoryService storyService) {
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
        this.handWashingService = handWashingService;
        this.fireBaseService = fireBaseService;
        this.visitService = visitService;
        this.newsService = newsService;
        this.snapshotService = snapshotService;
        this.quizService = quizService;
        this.fortuneService = fortuneService;
        this.scriptDetail = scriptDetail;
        this.utils = utils;
        this.levelService = levelService;
        this.storyService = storyService;
    }

    /* ***************************** Member ***************************** */
    /**
     * 거울에 등장한 멤버의 정보를 리턴합니다(멤버 기본정보, 위젯 설정)
     * @param requestInfo
     * @return
     */
    @PostMapping("/member")
    public ResponseEntity getMember(@RequestBody RequestInfo requestInfo) throws IOException, ParserException {
        ResponseDefault responseDefault = null; // response 객체 생성

        // 거울 시리얼 넘버와 멤버키 유효성 확인
        String serialNumber = requestInfo.getSerialNumber();
        String memberKey = requestInfo.getMemberKey();
        if (!utils.isValidAccess(serialNumber, memberKey)) {
            return errorResponse("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)");
        }

        // 멤버 정보 가져오기
        Member member = memberService.findByMemberKey(memberKey); // 멤버
        Widget widget = widgetService.findByMemberKey(memberKey); // 위젯
        ResponseWidget responseWidget = null;
        if (widget != null) {
            responseWidget = ResponseWidget.builder()
                    .news(widget.isNews())
                    .calender(widget.isCalender())
                    .playlist(widget.isPlaylist())
                    .build();
        }


        String playlist = playlistService.findByMemberKey(memberKey); // 플레이리스트
        String calendar = calendarService.findByMemberKey(memberKey); // 캘린더
        String dongCode = dongCodeService.findByMemberKey(memberKey); // 지역
        String fortune = fortuneService.getFortune(memberKey); // 포춘

        List<ResponseCalendar> responseCalendars = null;
        if(calendar != null && calendar.length()>0)
            responseCalendars = utils.getCalendars(calendar);


        // 만약 아이라면 - 레벨
        ResponseLevel responseLevel = null;
        if (member.isKidsMode()) {
            Level level = levelService.findByMemberKey(memberKey);
            if (level != null) {
                responseLevel = ResponseLevel.builder()
                        .lv(level.getLv())
                        .exp(level.getExp())
                        .build();
            }
        }


        // 뉴스
        List<News> newsList = newsService.findAll();
        List<ResponseNews> responseNewsList = new ArrayList<>();
        for (int i = 0; i < 50; i++) { // 50개만 전송
            News news = newsList.get(i);
            responseNewsList.add(ResponseNews.builder()
                    .press(news.getPress())
                    .title(news.getTitle())
                    .build());
        }

        // 마지막 방문 날짜와 시각
        String lastVisit = visitService.getLastVisit(member);

        // 방문기록 저장
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String visitTime = formatter.format(date);
        visitService.saveVisit(member, visitTime);


        // 멤버 동코드에 해당하는 지역 경도, 위도 정보
        ResponseRegion responseRegion = null;
        Region region = regionService.findByDongCode(dongCode);
        if (region != null) {
            responseRegion = ResponseRegion.builder()
                    .sidoName(region.getSidoName())
                    .gugunName(region.getGugunName())
                    .dongName(region.getDongName())
                    .lat(region.getLat())
                    .lng(region.getLng())
                    .build();
        }

        ResponseMember responseMember = ResponseMember.builder()
                .memberKey(member.getMemberKey())
                .nickname(member.getNickname())
                .birth(member.getBirth())
                .kidsMode(member.isKidsMode())
                .widget(responseWidget)
                .playlist(playlist)
                .calendarUrl(calendar)
                .calender(responseCalendars)
                .region(responseRegion)
                .news(responseNewsList)
                .fortune(fortune)
                .level(responseLevel)
                .lastVisit(lastVisit)
                .build();

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("성공")
                .data(responseMember)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    /* ***************************** Level ***************************** */

    /**
     * 아이가 수행한 양치/손씻기에 대한 경험치를 제공합니다.
     * 또한 아이의 양치/손씻기 기록을 저장합니다.
     * @param requestExp
     * @return
     */
    @PutMapping("/member/level")
    public ResponseEntity increaseExp(@RequestBody RequestExp requestExp) {
        // response 객체 생성
        ResponseDefault responseDefault = null;

        // 거울 시리얼넘버와 멤버키 유효성을 검사합니다.
        String serialNumber = requestExp.getSerialNumber();
        String memberKey = requestExp.getMemberKey();
        if (!utils.isValidAccess(serialNumber, memberKey)) {
            return errorResponse("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)");
        }


        // 해당 멤버 객체, 해당 멤버의 레벨, 경험치 정보를 가져옵니다.
        Member member = memberService.findByMemberKey(memberKey); // 멤버 객체
        if (!member.isKidsMode()) {
            return errorResponse("해당 멤버는 키즈모드를 지원하지 않습니다.");
        }
        Level level = levelService.findByMemberKey(memberKey); // 멤버의 레벨과 경험치
        if (level == null) {
            return errorResponse("해당 멤버의 레벨 정보가 존재하지 않습니다.");
        }

        int exp = level.getExp();
        int lv = level.getLv();

        // 레벨업 유무 체크
        boolean levelUp = false;
        boolean success = false;


        // 양치/손씻기 시간을 기록하기 위해 현재 시간 정보를 불러옵니다.
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String visitTime = formatter.format(date);
        // 오늘 날짜를 불러옵니다.
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
        String visitDay = formatter2.format(date);


        // 양치/손씻기 기록을 추가합니다.
        switch (requestExp.getMission()) {
            case "brushing": // 양치
                // 일단 양치 기록 추가
                brushingService.saveBrushing(member, visitTime, 1);

                // 경험치를 제공하기 위해선 오늘 한 양치 횟수가 3번 미만이어야 합니다.
                // 오늘의 양치기록 세기
                int count = brushingService.countAllByMemberAndBrushingTimeStartingWith(member, visitDay);
                // 맥스 확인 ( 양치의 경우 3번이 맥스 )
                if (count <= 3) { // 오늘 한 양치의 횟수가 3번 이상이라면
                    exp += 5; // 경험치 추가
                    success = true;
                }
//                if(count >= 3) { // 양치 3번 달성
//                    System.out.println("문자 발송!!!!!!!!");
//                    utils.sendSms(memberKey); // 해당 멤버의 유저 번호로 칭찬 문자를 전송합니다.
//                }
                break;
            case "hand_washing": // 손씻기
                // 일단 손씻기 기록 추가
                handWashingService.saveHandWashing(member, visitTime);

                // 경험치를 제공하기 위해선 오늘 한 손씻기 횟수가 3번 미만이어야 합니다.
                // 오늘의 양치기록 세기
                count = handWashingService.countAllByMemberAndHandWashingTimeStartingWith(member, visitDay);
                // 맥스 확인 ( 손씻기의 경우 10번이 맥스 )
                System.out.println("visitDay : "+visitDay);
                System.out.println("오늘 손씻기 : "+count);
                if (count <= 10) { // 오늘 한 양치의 횟수가 3번 이상이라면
                    exp += 2; // 경험치 추가
                    success = true;
                }
                break;

            case "CMD3": //
                exp += 10;
                break;
        }


        // 레벨업 확인
        if(exp >= 100) {
            exp -= 100;
            lv += 1;
            levelService.updateLv(lv, memberKey);
            levelUp = true;
        }

        levelService.updateExp(exp, memberKey);

        ResponseLevel responseLevel = ResponseLevel.builder()
                .exp(exp)
                .lv(lv)
                .levelUp(levelUp)
                .success(success)
                .build();

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("")
                .data(responseLevel)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    /* ***************************** SnapShot ***************************** */

    /***
     *
     * @param requestInsertSnapShot
     * @return
     */
    @PostMapping("/snapShot")
    public ResponseEntity insertSnapShot(RequestInsertSnapShot requestInsertSnapShot) throws IOException {

        // response 객체 생성
        ResponseDefault responseDefault = null;
        String serialNumber = requestInsertSnapShot.getSerialNumber();
        String memberKey = requestInsertSnapShot.getMemberKey();
        if(!utils.isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)", HttpStatus.OK);
        }

        // memberKey에 해당하는 Member를 가져옵니다.
        Member getMember = memberService.findByMemberKey(memberKey);
        if (getMember == null) return new ResponseEntity("유저가 존재하지 않음!", HttpStatus.OK);

        // fireBaseService.uploadFiles()를 통해서 firebase storage에 파일을 업로드하고 해당 파일에 대한 접근 url을
        // url에 담습니다.
        String url = fireBaseService.uploadFiles(requestInsertSnapShot.getImgFile(), requestInsertSnapShot.getImgName());

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




    /* ***************************** Script ***************************** */

    /**
     * 거울 앞의 사람과 상호작용하는 멘트를 리턴합니다.
     * @param requestGetScript
     * @return
     */
    @PostMapping("/getScript")
    public ResponseEntity getScript(@RequestBody RequestGetScript requestGetScript) {
        ResponseDefault responseDefault = null;

        // 거울 시리얼 넘버와 멤버키 유효성 확인
        String serialNumber = requestGetScript.getSerialNumber();
        String memberKey = requestGetScript.getMemberKey();
        Long reqkey = requestGetScript.getReqKey();
        int reaction = requestGetScript.getReaction();
        int type = requestGetScript.getType();

        if(!utils.isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        // 유저의 정보를 가져옵니다.
        Member member = memberService.findByMemberKey(requestGetScript.getMemberKey());

        // 요청이 도착한 현재 시간을 파악해놓습니다.
        LocalDateTime now = LocalDateTime.now();
        String strDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        //Return을 위한 객체
        KidsScript kidsScript = null;
        AdultScript adultScript = null;
        ResponseScript responseScript = null;

        // 유저가 어린이 Member 라면!
        if (member.isKidsMode()) {
            /** 첫 질문이라면(START)라면 */
            if (requestGetScript.getReqKey() == START && requestGetScript.getReaction() == 0 && requestGetScript.getType() == 0) {
                kidsScript = scriptDetail.getHelloScript(now, member, reqkey, reaction);

                /** 첫 질문이 아닐 때 START가 아닐 때! */
            } else {

                /** 전 멘트 타입이 인사(1~4) 이고 그에 대한 대답이 긍정이었을 경우, 양치 여부를 판단하여 제안으로 감 */
                if (requestGetScript.getType() <= 4 && requestGetScript.getReaction() == 1) {

                    //현재 어린이의 양치기록들을 모두 가져온 뒤 가장 최근값 즉 마지막 인덱스 기록을 가져옵니다.
                    List<Brushing> brushingList = brushingService.findAllByMember(member);
                    kidsScript = scriptDetail.getAskScript(now, member, reqkey, reaction, brushingList);

                    /** 양치 제안에 대한 응답이 아까 양치 했어! 일 경우 */
                } else if (requestGetScript.getType() == 5 && requestGetScript.getReaction() == 2) {

                    kidsScript = scriptDetail.getBasicScript(reqkey, reaction);

                    //외부에서 양치를 한 경우에 양치기록을 추가합니다 (type == 1)
                    brushingService.saveBrushing(member, strDate, 0);

                    /** 기본 화면에서 능동적인 양치 시작, 손씻기 시작  */
                } else if ((requestGetScript.getReaction() == 1 && requestGetScript.getType() == 5) || (requestGetScript.getReaction() == 1 && requestGetScript.getType() == 7)) {

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
        }

        /** 어른이라면 */
        if (!member.isKidsMode()) {

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
    public ResponseEntity getQuiz(@RequestBody RequestInfo requestInfo) {
        ResponseDefault responseDefault = null;

        String serialNumber = requestInfo.getSerialNumber();
        String memberKey = requestInfo.getMemberKey();
        if(!utils.isValidAccess(serialNumber, memberKey)) {
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

    /**
     * 멤버가 등록해놓은 ical 주소를 통해서 아직 시간이 지나지 않은 오늘의 일정을 가져옵니다.
     * @param requestInfo
     * @return
     */
    @PostMapping("/getCalendar")
    public ResponseEntity getCalendar(@RequestBody RequestInfo requestInfo) throws ParserException, IOException {
        ResponseDefault responseDefault = null;

        //멤버의 유효성 검사
        String serialNumber = requestInfo.getSerialNumber();
        String memberKey = requestInfo.getMemberKey();
        if(!utils.isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        //멤버키를 통해서 ical url을 가져옵니다.
        String url = calendarService.findByMemberKey(memberKey);

        //utils에 만들어놓은 getCalendars(url)을 통해서 일정목록을 가져옵니다.
        List<ResponseCalendar> responseCalendars = utils.getCalendars(url);

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg(null)
                .data(responseCalendars)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    //DB에 저장된 이야기를 하나 랜덤으로 가져옵니다.
    @GetMapping("/getStory")
    public ResponseEntity getStory(){
        Story getStory = storyService.getStory();

        //DB에 등록된 이야기가 존재하지 않을 경우
        if(getStory == null){
            return errorResponse("존재하는 이야기가 없습니다.");

            //정상 동작의 경우
        } else {
            ResponseStory responseStory = ResponseStory.builder()
                    .title(getStory.getTitle())
                    .content(getStory.getContent())
                    .build();

            return successResponse(responseStory);
        }
    }


    public ResponseEntity errorResponse(String msg) {
        ResponseDefault responseDefault = ResponseDefault.builder()
                .success(false)
                .msg(msg)
                .data(null)
                .build();
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    public ResponseEntity successResponse(Object data) {
        ResponseDefault responseDefault = ResponseDefault.builder()
                .success(true)
                .msg(null)
                .data(data)
                .build();
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }
}
