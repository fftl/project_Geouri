package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.repository.MemberRepository;
import com.ssafy.SmartMirror.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.time.LocalDateTime;
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
    private BrushingService brushingService;
    private FireBaseService fireBaseService;

    @Autowired
    public MirrorController(KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, BrushingService brushingService, FireBaseService fireBaseService) {
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
    }

    /**
     * 어린이 스크립트를 추가합니다.
     * @param script
     * @return
     */
    @PostMapping("/kidsScript/insert")
    public ResponseEntity insertKidsScript(@RequestParam("script") String script) {
        ResponseDefault responseDefault = null;

        System.out.println(script);
        int res = kidsScriptService.saveKidsScript(script);

        responseDefault = ResponseDefault.builder()
                .success(true)
                .data(res)
                .build();

        return new ResponseEntity<>(responseDefault, HttpStatus.OK);
    }

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
        Long memberKey = requestGetScript.getMemberKey();
        if(!isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }


        /** 1. 일단 우선적으로 오자마자 멤버의 정보를 가지고와 어린이인지 어른인지 확인합니다. */
        Member getMember = memberService.findByMemberKey(requestGetScript.getMemberKey());
        if (getMember == null) return new ResponseEntity("유저가 존재하지 않음!", HttpStatus.OK);

        /** 어린이라면 !! */
        if (getMember.isKidsMode()) {

            /** 1. 첫 질문일 때 if ( req_key == START(0) ) : 시간에 맞는 인사말을 리턴합니다. */
            if (requestGetScript.getReqKey() == START) {
                // 시간에 맞는 인사말 가져오기
                int helloType = whatTime(LocalDateTime.now().getHour());
//                helloType = MORNING; //아침 상황 테스트
                helloType = AFTERNOON; //점심 상황 테스트
//                helloType = EVENING; //저녁 상황 테스트
//                helloType = ALLTIME; //평상 상황 테스트

                System.out.println("log - nowWhatTime, hello type은? >> " + helloType);
                List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponse(requestGetScript.getReqKey(), requestGetScript.getReaction());

                //가져온 응답할 수 있는 리스트 중에서 일단은 첫번째 응답을 사용(나중엔 랜덤)
                //응답을 가지고 script 멘트를 조회합니다.
                KidsResponse kidsResponse = kidsResponseList.get(1); // 현 조건에 맞는 resKey 랜덤 추출
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
                    System.out.println("log - 현재시간 : > " + now.toString());
                    int year = now.getYear();
                    int month = now.getMonthValue();
                    int day = now.getDayOfMonth();
                    int daysSum = year+month+day;

                    List<Brushing> brushingList = brushingService.findAllByMember(requestGetScript.getMemberKey());
                    Brushing brushing = brushingList.get(brushingList.size()-1);
                    String[] date = brushing.getBrushingTime().split(" ");
                    String[] days = date[0].split("-");
                    String[] times = date[1].split(":");
                    int brushingDaysSum = Integer.parseInt(days[0]) + Integer.parseInt(days[1]) + Integer.parseInt(days[2]);

                    /** 오늘 날짜에 양치한 기록이 하나라도 있다면!  */
                    if(daysSum == brushingDaysSum) {
                        int historyType = whatTime(Integer.parseInt(times[0]));
                        int nowType = whatTime(now.getHour());

                        /** 마지막 양치 기록과 현재 시간의 시간 타입이 같다면 양치를 이미 한 것!
                         *  손씻기를 제안합니다! 손씻기 제안 resType == 7
                         * */
                        if(historyType==nowType){
                            System.out.println("log - 양치를 이미 했으므로 손씻기를 제안합니다.");
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

                            /** 오늘 양치를 하긴 했지만, 지금 시간타임이 아니었으므로 양치를 해야합니다.
                             *  양치를 제안! 양치 제안 resType == 5
                             * */
                        } else {
                            System.out.println("log - 이번 시간타임에는 양치를 하지 않았으므로 양치를 제안합니다.");
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
                        /** 오늘의 날짜에 양치한 기록이 아직 남아있지 않습니다!
                         *  양치를 제안! 양치 제안 resType == 5
                         * */
                    } else {
                        System.out.println("log - 오늘 한번도 양치를 하지 않았습니다. 양치를 제안합니다.");
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

    /**
     * 거울에 등장한 멤버의 정보를 리턴합니다(멤버 기본정보, 위젯 설정)
     * @param info
     * @return
     */
    @PostMapping("/member")
    public ResponseEntity readMember(@RequestBody RequestInfo info) {
        ResponseDefault responseDefault = null; // response 객체 생성

        // 1. 거울 시리얼 넘버와 멤버키 유효성 확인
        String serialNumber = info.getSerialNumber();
        Long memberKey = info.getMemberKey();
        if(!isValidAccess(serialNumber, memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)",HttpStatus.OK);
        }

        // 2. 멤버 정보 가져오기
        Member member = memberService.findByMemberKey(memberKey);

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

    @PostMapping("/snapShot")
    public ResponseEntity insertSnapShot(RequestInsertSnapShot insertSnapShot) throws IOException {
        ResponseDefault responseDefault = null; // response 객체 생성
        System.out.println(insertSnapShot.toString());
        if(!isValidAccess(insertSnapShot.getSerialNumber(), insertSnapShot.getMemberKey())) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음, 거울없음, 불일치)", HttpStatus.OK);
        }

        String url = fireBaseService.uploadFiles(insertSnapShot.getImgFile(), insertSnapShot.getImgName());

        responseDefault = ResponseDefault.builder()
                .success(true)
                .data(url)
                .msg(null)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
    // 호출함수
    /**
     * 현재 시간에 해당하는 시간대 타입을 리턴합니다.
     * @param hour 현재 시간의 시각
     * @return 시간대타입
     */
    public int whatTime(int hour){
//        System.out.println("nowWhatTime, 현재 시간은 >> "+hour);
        if(6 <= hour && hour <= 11) return MORNING;
        else if(12 <= hour && hour <= 17) return AFTERNOON;
        else if(18 <= hour && hour <= 23) return EVENING;
        else return ALLTIME;
    }

    /**
     * 현재 요청을 하는 유저가 정상접근인지 확인합니다. (거울 시리얼 넘버와 멤버 키 비교)
     * @param serialNumber
     * @param memberKey
     * @return
     */
    public boolean isValidAccess(String serialNumber, Long memberKey) {
        // 거울 넘버에 연결된 계정 정보와 멤버키를 가진 계정 정보가 같은지 확인

        // 1. 멤버키에 해당하는 멤버 불러오기
        Member member = memberService.findByMemberKey(memberKey);
        if(member == null) { // 멤버키에 해당하는 멤버가 없다면
            return false;
        }

        // 2. 시리얼넘버에 해당하는 거울 불러오기
        Mirror mirror = mirrorService.findBySerialNumber(serialNumber);
        if(mirror == null) { // 시리얼넘버에 해당하는 거울이 없다면
            return false;
        }

        // 3. 멤버와 거울이 같은 계정을 공유하는지 확인
        if(mirror.getUser().getUserKey() != member.getUser().getUserKey()) {
            return false;
        }

        // 멤버와 거울이 같은 계정을 공유 -> 정상 접근
        return true;
    }

}
