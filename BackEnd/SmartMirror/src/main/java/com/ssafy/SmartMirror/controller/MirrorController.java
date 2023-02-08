package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.config.Utils;
import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RequestMapping("/mirror")
@RestController
public class MirrorController {

    static final int START = 0; // 시작
    static final int MORNING = 1; // 오전
    static final int AFTERNOON = 2; // 오후
    static final int EVENING = 3; // 저녁
    static final int ALLTIME = 4; // 평시
    static final int BRUSHING_ASK = 5; // 양치 제안
    static final int BRUSHING_START = 6; // 양치 시작
    static final int HADN_ASK = 7; // 손씻기 제안
    static final int HAND_START = 8; // 손씻기 시작


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
    private Utils utils;

    @Autowired
    public MirrorController(KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, DongCodeService dongCodeService, BrushingService brushingService, FireBaseService fireBaseService, VisitService visitService, NewsService newsService, SnapshotService snapshotService, QuizService quizService, FortuneService fortuneService, Utils utils) {
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

        // 0. 유효한 접근인지 확인
        // 1. 거울 시리얼 넘버와 멤버키 유효성 확인
        String serialNumber = requestGetScript.getSerialNumber();
        String memberKey = requestGetScript.getMemberKey();
        if(!utils.isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        /** 1. 일단 우선적으로 오자마자 멤버의 정보를 가지고와 어린이인지 어른인지 확인합니다. */
        Member getMember = memberService.findByMemberKey(requestGetScript.getMemberKey());
        if (getMember == null) return new ResponseEntity("유저가 존재하지 않음!", HttpStatus.OK);

        /** 어린이라면 !! */
        if (getMember.isKidsMode()) {

            /** 1. 첫 질문일 때 if ( req_key == START(0) ) : 시간에 맞는 인사말을 리턴합니다. */
            if (requestGetScript.getReqKey() == START) {

                // 응답할 수 있는 응답 List를 가져옵니다. 그리고 Shuffle을 이용해서 순서를 섞어줍니다.
                List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponse(requestGetScript.getReqKey(), requestGetScript.getReaction());
                Collections.shuffle(kidsResponseList);

                // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
                KidsResponse kidsResponse = kidsResponseList.get(0); // 현 조건에 맞는 resKey 랜덤 추출
                KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey()); // resKey 에 맞는 스트링 문장 추출

                //선택한 kidsScript를 가지고 resopnseDto를 만듭니다.
                ResponseScript responseScript = ResponseScript.builder()
                        .script(kidsScript.getScript())
                        .res_key(kidsScript.getScriptKey())
                        .type(kidsScript.getType())
                        .build();

                //첫 인사 Return!
                responseDefault = ResponseDefault.builder()
                        .success(true)
                        .data(responseScript)
                        .build();

                return new ResponseEntity(responseDefault, HttpStatus.OK);

            /** 첫 질문이 아닐 때 if (req_key != 0) */
            } else {
                /** 전 멘트 타입이 인사(1~4) 이고 그에 대한 대답이 긍정이었을 경우, 양치 여부를 판단하여 제안으로 감 */
                if(requestGetScript.getType() <= 4 && requestGetScript.getReaction() == 1) {

                    //현재 시간의 정보와 마지막 양치 기록의 시간을 확인하여 양치 여부를 판단합니다.
                    LocalDateTime now = LocalDateTime.now();
                    int year = now.getYear();
                    int month = now.getMonthValue();
                    int day = now.getDayOfMonth();

                    //현재 어린이의 양치기록들을 모두 가져온 뒤 가장 최근값 즉 마지막 인덱스 기록을 가져옵니다.
                    List<Brushing> brushingList = brushingService.findAllByMember(requestGetScript.getMemberKey());
                    Brushing brushing = brushingList.get(brushingList.size()-1);
                    String[] date = brushing.getBrushingTime().split(" ");
                    String[] days = date[0].split("-");
                    String[] times = date[1].split(":");

                    //오늘 시간과, 마지막 양치기록의 시각을 더해주어 비교하기 쉽도록 만들어줍니다.
                    int daysSum = year+month+day;
                    int brushingDaysSum = Integer.parseInt(days[0]) + Integer.parseInt(days[1]) + Integer.parseInt(days[2]);

                    /** daysSum과 brushingDaysSum의 값이 같다면 오늘 양치를 이미 했었다는 뜻! */
                    if(daysSum == brushingDaysSum) {
                        int historyType = utils.whatTime(Integer.parseInt(times[0]));
                        int nowType = utils.whatTime(now.getHour());

                        /**
                         *  날짜가 같다면 시간타입을 구해서 비교합니다. 이미 양치를 했다면 손씻기를 제안합니다.
                         * */
                        if(historyType==nowType){
                            //응답중에
                            List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(requestGetScript.getReqKey(), requestGetScript.getReaction(), 7);

                            //질문을 무사히 가져왔다면!
                            if(kidsResponseList.size()>0){
                                KidsResponse kidsResponse = kidsResponseList.get(0);
                                KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

                                //선택한 kidsScript를 가지고 resopnseDto를 만듭니다.
                                ResponseScript responseScript = ResponseScript.builder()
                                        .script(kidsScript.getScript())
                                        .res_key(kidsScript.getScriptKey())
                                        .type(kidsScript.getType())
                                        .build();

                                //첫 인사 Return!
                                responseDefault = ResponseDefault.builder()
                                        .success(true)
                                        .data(responseScript)
                                        .build();

                                return new ResponseEntity(responseDefault, HttpStatus.OK);
                            } else {
                                return new ResponseEntity("가능한 질문이 존재하지 않습니다.", HttpStatus.OK);
                            }

                            /** 오늘 양치를 하긴 했지만, 지금 시간타임이 아니었으므로 양치를 해야합니다.
                             *  양치를 제안! 양치 제안 resType == 5
                             * */
                        } else {
                            System.out.println("log - 이번 시간타임에는 양치를 하지 않았으므로 양치를 제안합니다.");
                            List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(requestGetScript.getReqKey(), requestGetScript.getReaction(), 5);

                            //질문을 무사히 가져왔다면!
                            if(kidsResponseList.size()>0){
                                KidsResponse kidsResponse = kidsResponseList.get(0);
                                KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

                                //선택한 kidsScript를 가지고 resopnseDto를 만듭니다.
                                ResponseScript responseScript = ResponseScript.builder()
                                        .script(kidsScript.getScript())
                                        .res_key(kidsScript.getScriptKey())
                                        .type(kidsScript.getType())
                                        .build();

                                //첫 인사 Return!
                                responseDefault = ResponseDefault.builder()
                                        .success(true)
                                        .data(responseScript)
                                        .build();

                                return new ResponseEntity(responseDefault, HttpStatus.OK);
                            } else {
                                return new ResponseEntity("가능한 질문이 존재하지 않습니다.", HttpStatus.OK);
                            }
                        }
                        /** 오늘의 날짜에 양치한 기록이 아직 남아있지 않습니다!
                         *  양치를 제안! 양치 제안 resType == 5
                         * */
                    } else {
                        System.out.println("log - 오늘 한번도 양치를 하지 않았습니다. 양치를 제안합니다.");
                        List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(requestGetScript.getReqKey(), requestGetScript.getReaction(), 5);

                        //질문을 무사히 가져왔다면!
                        if(kidsResponseList.size()>0){
                            KidsResponse kidsResponse = kidsResponseList.get(0);
                            KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

                            //선택한 kidsScript를 가지고 resopnseDto를 만듭니다.
                            ResponseScript responseScript = ResponseScript.builder()
                                    .script(kidsScript.getScript())
                                    .res_key(kidsScript.getScriptKey())
                                    .type(kidsScript.getType())
                                    .build();

                            //첫 인사 Return!
                            responseDefault = ResponseDefault.builder()
                                    .success(true)
                                    .data(responseScript)
                                    .build();

                            return new ResponseEntity(responseDefault, HttpStatus.OK);
                        } else {
                            return new ResponseEntity("가능한 질문이 존재하지 않습니다.", HttpStatus.OK);
                        }
                    }
                } // 인사 멘트에 대한 긍정 반응이었을 경우, 제안으로 감

                /** 그 외의 경우는 맞춰서 보내면 됨 */
                List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponse(requestGetScript.getReqKey(), requestGetScript.getReaction());

                //질문을 무사히 가져왔다면!
                if(kidsResponseList.size()>0){
                    KidsResponse kidsResponse = kidsResponseList.get(0);
                    KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

                    //선택한 kidsScript를 가지고 resopnseDto를 만듭니다.
                    ResponseScript responseScript = ResponseScript.builder()
                            .script(kidsScript.getScript())
                            .res_key(kidsScript.getScriptKey())
                            .type(kidsScript.getType())
                            .build();

                    //첫 인사 Return!
                    responseDefault = ResponseDefault.builder()
                            .success(true)
                            .data(responseScript)
                            .build();
                    return new ResponseEntity(responseDefault, HttpStatus.OK);
                } else {
                    return new ResponseEntity("가능한 질문이 존재하지 않습니다.", HttpStatus.OK);
                }


            }
        } // 어린이

        /* 어른이라면 */
        if (!getMember.isKidsMode()) {
            return new ResponseEntity("어른 서비스는 아직 만들지 못했어요..", HttpStatus.OK);
        } // 어른

        return new ResponseEntity("어른과 아이 모두 아님", HttpStatus.OK);
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
        System.out.println(insertSnapShot.toString());
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
