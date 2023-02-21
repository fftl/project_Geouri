package com.ssafy.SmartMirror.config;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.User;
import com.ssafy.SmartMirror.service.MemberService;
import com.ssafy.SmartMirror.service.UserService;
import com.ssafy.SmartMirror.service.VisitService;
import kotlinx.datetime.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/*
- 1시간에 한번씩
    - noticeMode 가 true인 user에 대하여
    - 해당 user 의 member list 받아와서
    - noticeMode 가 true인 member 들마다
    - 마지막 방문기록을 받아와서 48시간이 지났는지 확인
    - 만약 지났으면 해당 user 에게 member 가 지났다고 문자보내기
 */

@Component
//@RequestMapping("/test")
//@RestController
public class Notice {

    private UserService userService;
    private MemberService memberService;
    private VisitService visitService;
    private Utils utils;

    @Autowired
    public Notice(UserService userService, MemberService memberService, VisitService visitService, Utils utils) {
        this.userService = userService;
        this.memberService = memberService;
        this.visitService = visitService;
        this.utils = utils;
    }

        @Scheduled(cron = "0 0 * * * *") // 매번 한시간마다
//    @GetMapping("/ttt")
    public String check() throws ParseException {
        List<User> userList = userService.findAllByNoticeMode(true);

        for(User user : userList) {
            System.out.println("알림 설정한 유저: "+user.getUserKey());

            List<Member> memberList = user.getMemberList();
            for (Member member : memberList) {
                if(member.isNoticeMode()) { // 알림 추적 요청한 멤버마다
                    System.out.println("알림 추적 설정한 멤버: "+member.getNickname());
                    // 마지막 방문시간
                    String lastVisit = visitService.getLastVisit(member);

                    if (lastVisit != null) { // 한 번이라도 방문한 적이 있음
                        // 48시간 지났는지 확인
                        Date date = new Date();
                        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        String now = formatter.format(date);

                        Date format1 = formatter.parse(lastVisit);
                        Date format2 = formatter.parse(now);

                        int diffHour = (int) ((format2.getTime() - format1.getTime()) / 3600000); //시 차이

                        System.out.println("now: " + now);
                        System.out.println("lastVisit: " + lastVisit);
                        System.out.println(diffHour + "시 차이");

                        // 만약 48시간 지났으면 하루에 한 번씩 문자 보내기
                        if (diffHour >= 48 && diffHour % 24 == 0) {
                            utils.sendNoticeSms(member.getMemberKey(), diffHour);
                        }

                    }
                }
            }

        }
        return "하하";
    }

}
