package com.ssafy.SmartMirror.controller;

import com.ssafy.SmartMirror.config.FireBaseService;
import com.ssafy.SmartMirror.config.Utils;
import com.ssafy.SmartMirror.domain.*;
import com.ssafy.SmartMirror.dto.*;
import com.ssafy.SmartMirror.service.*;
import net.fortuna.ical4j.data.ParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
    private DongCodeService dongCodeService;
    private BrushingService brushingService;
    private FireBaseService fireBaseService;
    private VisitService visitService;
    private NewsService newsService;
    private Utils utils;
    private SnapshotService snapshotService;
    private EmailCheckService emailCheckService;
    private MessageService messageService;

    @Autowired
    public WebController(UserService userService, KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, MemberService memberService, MirrorService mirrorService, WidgetService widgetService, PlaylistService playlistService, CalendarService calendarService, RegionService regionService, DongCodeService dongCodeService, BrushingService brushingService, FireBaseService fireBaseService, VisitService visitService, NewsService newsService, Utils utils, SnapshotService snapshotService, EmailCheckService emailCheckService, MessageService messageService) {
        this.userService = userService;
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
        this.utils = utils;
        this.snapshotService = snapshotService;
        this.emailCheckService = emailCheckService;
        this.messageService = messageService;
    }

    /* ***************************** User ***************************** */

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody RequestLogin requestLogin) {
        ResponseDefault responseDefault = null;
        String email = requestLogin.getEmail();
        String password = requestLogin.getPassword();

        // email 과 password 에 맞는 계정이 있는지 확인
        User user = userService.findByEmailAndPassword(email, password);
        Mirror getMirror = mirrorService.findByUser(user);

        // 해당 유저의 유저키 반환
        if(user == null) {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("아이디/비밀번호가 일치하지 않습니다.")
                    .data(null)
                    .build();
        } else {
            ResponseLogin responseLogin = ResponseLogin.builder()
                    .userKey(user.getUserKey())
                    .serialNumber(getMirror.getSerialNumber())
                    .build();

            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(responseLogin)
                    .build();
        }
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    //회원가입 시에 이메일을 입력하여 임시 이메일과 토큰을 DB에 저장합니다.
    @PostMapping("/addEmailCheck")
    public ResponseEntity addEmailCheck(@RequestParam String email) { // 이메일 등록
        ResponseDefault responseDefault = null;
        User findUser = userService.findByEmail(email);

        if(findUser != null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("이미 존재하는 이메일입니다.")
                    .data(null)
                    .build();

            return new ResponseEntity(responseDefault, HttpStatus.OK);
        }
        Long emailKey = emailCheckService.saveEmailCheck(email);

        if(emailKey != null){
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(emailKey)
                    .build();
        } else {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("임시 이메일, 인증키 생성 실패")
                    .data(null)
                    .build();
        }

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    //DB에 저장되어 있는 토큰과 유저가 입력한 토큰이 동일한지 확인합니다.
    @PostMapping("/confirmEmailCheck")
    public ResponseEntity comfirmEmailCheck(@RequestBody RequestConfirmEmail requestConfirmEmail) {
        ResponseDefault responseDefault = null;
        EmailCheck emailCheck = emailCheckService.confirmEmailCheck(requestConfirmEmail.getEmail());

        if(emailCheck == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("올바르지 않은 Email 정보가 입력되었습니다.")
                    .data(null)
                    .build();
        } else if(!emailCheck.getToken().equals(requestConfirmEmail.getToken())){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("인증번호 인증에 실패하였습니다.")
                    .data(null)
                    .build();
        } else {
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(true)
                    .build();
        }

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity addUser(@RequestBody RequestUser requestUser) { // 유저 등록
        ResponseDefault responseDefault = null;
        String newKey = utils.createRandomKey(8);
        User getUser = userService.findByUserKey(newKey);

        while(getUser != null){
            newKey = utils.createRandomKey(8);
            getUser = userService.findByUserKey(newKey);
        }

        User saveUser = userService.saveUser(requestUser, newKey);

        if(saveUser == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("유저 생성과정에서 문제가 발생하였습니다.")
                    .data(null)
                    .build();
        } else {
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(saveUser.getUserKey())
                    .build();
        }

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity getUser(@RequestHeader("user-key") String userKey) { // 유저 읽기
        ResponseDefault responseDefault = null;
        System.out.println(userKey);
        User user = userService.findByUserKey(userKey);

        List<Mirror> mirrorEntityList = user.getMirrorList();
        List<ResponseMirror> mirrorList = null;
        if(mirrorEntityList != null) {
            mirrorList = new ArrayList<>();
            for (Mirror mirror : mirrorEntityList) {
                mirrorList.add(ResponseMirror.builder()
                        .serialNumber(mirror.getSerialNumber())
                        .nickname(mirror.getNickname())
                        .build());
            }
        }



        if(user == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("유저 키에 해당하는 유저를 찾을 수 없습니다.")
                    .data(null)
                    .build();
        } else {
            ResponseUser responseUser = ResponseUser.builder()
                    .userKey(user.getUserKey())
                    .email(user.getEmail())
                    .tel(user.getTel())
                    .birth(user.getBirth())
                    .mirrorList(mirrorList)
                    .build();

            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(responseUser)
                    .build();
        }
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity updateUser(@RequestHeader("user-key") String userKey, @RequestBody RequestUser requestUser) { // 유저 수정
        ResponseDefault responseDefault = null;
        User updateUser = userService.saveUser(requestUser, userKey);

        if(updateUser == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("유저 키를 통해 찾을 수 있는 유저 정보가 존재하지 않습니다.")
                    .data(null)
                    .build();
        } else {
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(updateUser)
                    .build();
        }

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    @DeleteMapping("/user")
    public ResponseEntity deleteUser(@RequestHeader("user-key") String userKey) { // 유저 삭제
        ResponseDefault responseDefault = null;
        User getUser = userService.findByUserKey(userKey);

        if(getUser == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("유저 키를 통해 찾을 수 있는 유저 정보가 존재하지 않습니다.")
                    .data(null)
                    .build();
        } else {
            userService.deleteUser(getUser);
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(null)
                    .build();
        }

        // implememt here
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    /**
     * 해당 유저가 가지고 있는 멤버 리스트 반환
     * @param userKey
     * @return
     */
    @GetMapping("/user/memberlist")
    public ResponseEntity getMemberList(@RequestHeader("user-key") String userKey) {
        ResponseDefault responseDefault = null; // response 객체 생성

        // 해당 유저 있는지 확인
        if(!utils.isValidUserKey(userKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }


        User user = userService.findByUserKey(userKey); // 유저키에 해당하는 유저 가져오기
        List<Member> memberEntityList = user.getMemberList(); // 해당 유저에 연결된 멤버리스트 가져오기

        List<ResponseMember> responseMemberList = new ArrayList<>(); // 멤버리스트를 응답 dto로 변경
        for (Member member : memberEntityList) {
            responseMemberList.add(ResponseMember.builder()
                    .memberKey(member.getMemberKey())
                    .imgUrl(member.getImgUrl())
                    .nickname(member.getNickname())
                    .build());
        }

        ResponseMemberList memberList = ResponseMemberList.builder()
                .memberList(responseMemberList)
                .build();

        responseDefault = ResponseDefault.builder()
                .success(true)
                .msg("")
                .data(memberList)
                .build();

        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }


    @PostMapping("/user/mirror")
    public ResponseEntity registMirror() { // 거울 등록
        return null;
    }

    @GetMapping("/user/mirror")
    public ResponseEntity getMirrorList() { // 거울 리스트 반환
        return null;
    }

    @PutMapping("/user/mirror")
    public ResponseEntity updateMirror() { // 거울 정보 수정
        return null;
    }

    @DeleteMapping("/user/mirror")
    public ResponseEntity deleteMirror() { // 거울 삭제
        return null;
    }


    /* ***************************** Member ***************************** */


    /**
     * 멤버 추가
     * @param requestMember
     * @return
     */
    @PostMapping("/member")
    public ResponseEntity addMember(@RequestHeader("user-key") String userKey, @RequestBody RequestMember requestMember) {
        ResponseDefault responseDefault = null;

        // 유저 불러오기
        User user = userService.findByUserKey(userKey);

        if(user == null) {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("등록된 유저가 없습니다.")
                    .data(null)
                    .build();
            return new ResponseEntity(responseDefault, HttpStatus.OK);
        }

        // 멤버키 생성
        String newMemberKey = utils.createRandomKey(8);
        while(memberService.findByMemberKey(newMemberKey) != null) {
            newMemberKey = utils.createRandomKey(8);
        }


        Member newMember = memberService.saveMember(requestMember, user, newMemberKey);
        if(newMember==null) {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("멤버 생성 중 에러가 발생하였습니다.")
                    .data(null)
                    .build();

            return new ResponseEntity(responseDefault, HttpStatus.OK);
        }


        // 위젯 등록
        Widget newWidget = widgetService.saveWidget(requestMember, newMemberKey);
        if(newWidget==null) {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("위젯 생성 중 에러가 발생하였습니다.")
                    .data(null)
                    .build();

            return new ResponseEntity(responseDefault, HttpStatus.OK);
        }

        // 플레이리스트 등록
        if(requestMember.getPlaylistLink() != null) {
            Playlist newPlaylist = playlistService.savePlaylist(requestMember, newMemberKey);
        }

        // 캘린더 등록
        if(requestMember.getCalendarLink() != null) {
            Calendar newCalendar = calendarService.saveCalendar(requestMember, newMemberKey);
        }

        // 지역 등록
        if(requestMember.getDongCode() != null) {
            DongCode dongCode = dongCodeService.saveDongCode(requestMember, newMemberKey);
        }

        // 등록완료
        // 멤버 정보 가져오기
        Member member = memberService.findByMemberKey(newMemberKey); // 멤버
        Widget widget = widgetService.findByMemberKey(newMemberKey); // 위젯
        String playlist = playlistService.findByMemberKey(newMemberKey); // 플레이리스트

        // 지역 정보
        String dongCode = dongCodeService.findByMemberKey(newMemberKey);
        Region region = regionService.findByDongCode(dongCode);

        // 캘린더
        String calendar = calendarService.findByMemberKey(newMemberKey);
        // 캘린더 링크 접속 후 파싱 필요 !!!


        // responseDto 꾸리기
        ResponseWidget responseWidget = ResponseWidget.builder()
                .news(widget.isNews())
                .calender(widget.isCalender())
                .playlist(widget.isPlaylist())
                .build();

        ResponseRegion responseRegion = ResponseRegion.builder()
                .sidoName(region.getSidoName())
                .gugunName(region.getGugunName())
                .dongName(region.getDongName())
                .lat(region.getLat())
                .lng(region.getLng())
                .build();


        ResponseMember responseMember = ResponseMember.builder()
                .memberKey(member.getMemberKey())
                .nickname(member.getNickname())
                .imgUrl(member.getImgUrl())
                .playlist(playlist)
                .calendarUrl(calendar)
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
     * 해당 멤버의 위젯 정보(여부, 링크, 지역) 반환
     * @param memberKey
     * @return
     */
    @GetMapping("/member")
    public ResponseEntity getWidget(@RequestHeader("member-key") String memberKey) throws ParserException, IOException {
        ResponseDefault responseDefault = null;

        // 해당 멤버 있는지 확인
        if(!utils.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        // 멤버 정보 가져오기
        Member member = memberService.findByMemberKey(memberKey); // 멤버
        Widget widget = widgetService.findByMemberKey(memberKey); // 위젯
        String playlist = playlistService.findByMemberKey(memberKey); // 플레이리스트

        // 지역 정보
        String dongCode = dongCodeService.findByMemberKey(memberKey);
        Region region = regionService.findByDongCode(dongCode);

        // 캘린더
        String calUrl = calendarService.findByMemberKey(memberKey);
        List<ResponseCalendar> responseCalendars = utils.getCalendars(calUrl);
        // 캘린더 링크 접속 후 파싱 필요 !!!


        // responseDto 꾸리기
        ResponseWidget responseWidget = ResponseWidget.builder()
                .news(widget.isNews())
                .calender(widget.isCalender())
                .playlist(widget.isPlaylist())
                .build();

        ResponseRegion responseRegion = ResponseRegion.builder()
                .sidoName(region.getSidoName())
                .gugunName(region.getGugunName())
                .dongName(region.getDongName())
                .lat(region.getLat())
                .lng(region.getLng())
                .build();


        ResponseMember responseMember = ResponseMember.builder()
                .memberKey(member.getMemberKey())
                .nickname(member.getNickname())
                .imgUrl(member.getImgUrl())
                .playlist(playlist)
                .calendarUrl(calUrl)
                .calender(responseCalendars)
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
     * 멤버의 위젯 정보(show 여부, 링크, 지역 정보) 수정
     * @param requestWidget
     * @return
     */
    @PutMapping("/widget")
    public ResponseEntity updateWidget(@RequestHeader("member-key") String memberKey, @RequestBody RequestWidget requestWidget) {
        ResponseDefault responseDefault = null;

        // 멤버키 유효성 확인
        if(!utils.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (멤버키 없음)",HttpStatus.OK);
        }

        String cmd = requestWidget.getCmd();
        String value = requestWidget.getValue();

        int res = 0;

        // 아이모드(kidsMode), 재생목록(playlist), 뉴스/기사(news), 캘린더(calendar), 재생목록링크(playlistLink), 캘린더링크(calendarLink), 지역(region)
        switch(cmd) {
            case "noticeMode":
                res = memberService.updateNoticeMode(value, memberKey);
                break;
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
            case "region":
                String[] address = value.split(" ");
                String sidoName = address[0]; // 시,도 이름
                String gugunName = address[1]; // 구,군 이름
                String dongName = address[2]; // 동 이름
                String dongCode = regionService.findBySidoNameAndGugunNameAndDongName(sidoName, gugunName, dongName);
                res = dongCodeService.updateDongCode(dongCode, memberKey);
                break;
        }

        if(res == 1) {
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(null)
                    .build();
        } else {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("변경에 실패했습니다.")
                    .data(null)
                    .build();
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
    public ResponseEntity getBrushLog(@RequestHeader("member-key") String memberKey, @RequestParam String year, @RequestParam String month) {
        ResponseDefault responseDefault = null;

        // 해당 멤버 있는지 확인
        if(!utils.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        // 해당 멤버의 브러쉬 기록 중 year, month 에 해당하는 양치기록을 가져온다
        int[] brushlog = new int[31];
        String searchMonth = year+"-"+month;
        Member member = memberService.findByMemberKey(memberKey);

        List<Brushing> brushinglog = brushingService.findAllByMemberAndBrushingTimeStartingWith(member, searchMonth);
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

    /**
     * 멤버의 모든 사진을 가져옵니다.
     * @param memberKey
     * @return
     */
    @GetMapping("/snapShot/all")
    public ResponseEntity getAllSnapShot(@RequestHeader("member-key") String memberKey){
        // 반환값을 담을 Response 객체들을 선언
        ResponseDefault responseDefault = null;
        List<ResponseSnapShot> responseSnapShotList = null;

        // 해당 멤버 있는지 확인
        if(!utils.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        // 멤버의 객체를 가져옵니다.
        Member member = memberService.findByMemberKey(memberKey);

        // 해당 멤버의 사진을 모두 가져옵니다.
        List<Snapshot> snapshotList = snapshotService.getAllSnapShot(member);

        // 만약 사진이 하나도 존재하지 않는다면 해당 false를 리턴합니다.
        if(snapshotList.isEmpty()) {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("멤버의 사진이 존재하지 않습니다.")
                    .data(null)
                    .build();

            // 사진이 하나라도 존재한다면!
        } else {

            // 사진 정보들을 담을 List를 선언해 놓습니다.
            responseSnapShotList = new ArrayList<>();

            // for문을 돌며 member 객체를 제외한 실제 정보들만 담아냅니다.
            for (int i = 0; i < snapshotList.size(); i++) {
                Snapshot snapshot = snapshotList.get(i);
                ResponseSnapShot responseSnapShot = ResponseSnapShot.builder()
                        .imgUrl(snapshot.getImgUrl())
                        .created(snapshot.getCreated())
                        .memberKey(snapshot.getMember().getMemberKey())
                        .build();
                responseSnapShotList.add(responseSnapShot);
            }

            // response를 만들어냅니다.
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(responseSnapShotList)
                    .build();
        }

        //반환!
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    /**
     * 멤버의 일주일 내 사진을 10개만 반환합니다.
     * @param memberKey
     * @return
     */
    @GetMapping("/snapShot/week")
    public ResponseEntity getWeekSnapShot(@RequestHeader("member-key") String memberKey){

        // 반환값을 담을 Response 객체들을 선언
        ResponseDefault responseDefault = null;
        List<ResponseSnapShot> responseSnapShotList = null;

        // 해당 멤버 있는지 확인
        if(!utils.isValidMemberKey(memberKey)) {
            return new ResponseEntity("유효하지 않은 접근입니다. (해당 유저 없음)", HttpStatus.OK);
        }

        // 멤버 객체를 가져옴
        Member member = memberService.findByMemberKey(memberKey);

        // 일주일 내의 사진들을 가져옴
        List<Snapshot> snapshotList = snapshotService.getWeekSnapShot(member);

        // 일주일 내의 사진이 하나도 없을 경우 false 반환
        if(snapshotList == null) {
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("멤버의 사진이 존재하지 않습니다.")
                    .data(null)
                    .build();

        } else {

            // 사진 정보를 담을 List를 선언해주고 사진들의 순서를 섞어줍니다.
            responseSnapShotList = new ArrayList<>();
            Collections.shuffle(snapshotList);

            // for문을 통해서 사진 리스트를 돌며 10개만 담아냅니다.
            for (int i = 0; i < snapshotList.size(); i++) {
                if(responseSnapShotList.size() == 10) break;
                Snapshot snapshot = snapshotList.get(i);
                ResponseSnapShot responseSnapShot = ResponseSnapShot.builder()
                        .imgUrl(snapshot.getImgUrl())
                        .created(snapshot.getCreated())
                        .memberKey(snapshot.getMember().getMemberKey())
                        .build();
                responseSnapShotList.add(responseSnapShot);
            }

            // 반환값 생성
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .msg(null)
                    .data(responseSnapShotList)
                    .build();
        }

        // 반환!
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }

    @PostMapping("/sendMessage")
    public ResponseEntity insertMessage(@RequestHeader("user-key") String userKey, @RequestBody RequestAddMessage requestAddMessage){
        ResponseDefault responseDefault = null;
        Message message = messageService.addMessage(
                requestAddMessage.getMember_key_from(),
                requestAddMessage.getMember_key_to(),
                requestAddMessage.getName_from(),
                requestAddMessage.getName_to(),
                requestAddMessage.getContent()
        );

        if(message == null){
            responseDefault = ResponseDefault.builder()
                    .success(false)
                    .msg("메시지 등록에 실패하였습니다.")
                    .build();
        } else {
            responseDefault = ResponseDefault.builder()
                    .success(true)
                    .build();
        }
        return new ResponseEntity(responseDefault, HttpStatus.OK);
    }
}