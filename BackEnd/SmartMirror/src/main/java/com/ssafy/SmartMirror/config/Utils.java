package com.ssafy.SmartMirror.config;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Mirror;
import com.ssafy.SmartMirror.domain.User;
import com.ssafy.SmartMirror.dto.ResponseCalendar;
import com.ssafy.SmartMirror.service.MemberService;
import com.ssafy.SmartMirror.service.MirrorService;
import com.ssafy.SmartMirror.service.UserService;
import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.data.ParserException;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.component.CalendarComponent;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.DtEnd;
import net.fortuna.ical4j.model.property.DtStart;
import net.fortuna.ical4j.model.property.Location;
import net.fortuna.ical4j.model.property.Summary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.TimeZone;

@Component
public class Utils {
    static final int MORNING = 1; // 오전
    static final int AFTERNOON = 2; // 오후
    static final int EVENING = 3; // 저녁
    static final int ALLTIME = 4; // 평시

    private MemberService memberService;
    private MirrorService mirrorService;
    private UserService userService;

    @Autowired
    public Utils(MemberService memberService, MirrorService mirrorService, UserService userService) {
        this.memberService = memberService;
        this.mirrorService = mirrorService;
        this.userService = userService;
    }

    /**
     * 소문자, 대문자, 숫자(0~9)으로 구성된 랜덤난수를 생성합니다.
     *
     * @param length
     * @return
     */
    public String createRandomKey(int length) {
        char[] charaters = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
        StringBuffer sb = new StringBuffer();
        Random rn = new Random();
        for (int i = 1; i < length + 1; i++) {
            sb.append(charaters[rn.nextInt(charaters.length)]);
            if (i % 4 == 0 && i != length) sb.append("-");

        }
        return sb.toString();
    }

    /**
     * 현재 시간에 해당하는 시간대 타입을 리턴합니다.
     *
     * @param hour 현재 시간의 시각
     * @return 시간대타입
     */
    public int whatTime(int hour) {
//        System.out.println("nowWhatTime, 현재 시간은 >> "+hour);
        if (6 <= hour && hour <= 11) return MORNING;
        else if (12 <= hour && hour <= 17) return AFTERNOON;
        else if (18 <= hour && hour <= 23) return EVENING;
        else return ALLTIME;
    }

    /**
     * 현재 요청을 하는 유저가 정상접근인지 확인합니다. (거울 시리얼 넘버와 멤버 키 비교)
     *
     * @param serialNumber
     * @param memberKey
     * @return
     */
    public boolean isValidAccess(String serialNumber, String memberKey) {
        // 거울 넘버에 연결된 계정 정보와 멤버키를 가진 계정 정보가 같은지 확인

        // 1. 멤버키에 해당하는 멤버 불러오기
        Member member = memberService.findByMemberKey(memberKey);
        if (member == null) { // 멤버키에 해당하는 멤버가 없다면
            return false;
        }

        // 2. 시리얼넘버에 해당하는 거울 불러오기
        Mirror mirror = mirrorService.findBySerialNumber(serialNumber);
        if (mirror == null) { // 시리얼넘버에 해당하는 거울이 없다면
            return false;
        }

        // 3. 멤버와 거울이 같은 계정을 공유하는지 확인
        if (mirror.getUser().getUserKey() != member.getUser().getUserKey()) {
            return false;
        }

        // 멤버와 거울이 같은 계정을 공유 -> 정상 접근
        return true;
    }

    public boolean isValidUserKey(String userKey) {
        User user = userService.findByUserKey(userKey);

        if (user == null) { // 해당 유저 없음
            return false;
        }
        return true;
    }

    public boolean isValidMemberKey(String memberKey) {
        Member member = memberService.findByMemberKey(memberKey);

        if (member == null) { // 해당 유저 없음
            return false;
        }
        return true;
    }

    //url을 통해서 가져온 일정을 List에 담아서 반환합니다.
    public List<ResponseCalendar> getCalendars(String url) throws IOException, ParserException {

        //Url이용해서 icalendar의 일정들을 모두 가져옵니다!
        CalendarBuilder builder = new CalendarBuilder();
        Calendar calendar = builder.build(new URL(url).openStream());

        //반환할 때 사용할 List<ResponseCalendar>을 미리 선언해놓습니다.
        List<ResponseCalendar> responseCalendars = new ArrayList<>();

        //오늘의 일정인지 확인하기 위해 Date.now()를 미리 선언해 놓았습니다.
        LocalDate localDate = LocalDate.now();
        LocalDateTime localDateTime = LocalDateTime.now();

        //icalendar에서 가져온 객체들을 java에서 사용할 수 있는 형태의 List로 변환하였습니다.
        List<CalendarComponent> list = calendar.getComponents(net.fortuna.ical4j.model.Component.VEVENT);

        //for문을 통해 일정을 하나씩 꺼내며 사용할 수 있는 일정인지 판단합니다.
        for (int i = 0; i < list.size(); i++) {

            VEvent vEvent = (VEvent) list.get(i);
            Summary summary = vEvent.getSummary().orElse(null);     //제목
            DtStart dtStart = vEvent.getStartDate().orElse(null);   //시작 시간
            DtEnd dtEnd = vEvent.getEndDate().orElse(null);         //종료 시간
            Location location = vEvent.getLocation().orElse(null);  //장소

            //LocalDateTime을 사용해야 한다면 쓸 틀을 미리 선언해 놓았습니다!
            LocalDateTime ldtStart = null;
            LocalDateTime ldtEnd = null;

            //각 항목들을 미리 선언해놓습니다.
            String title, start, end, where;
            title = start = end = where = null;

            //각 항목들이 null이 아니라면 String에 담아줍니다.
            if (summary != null) title = summary.getValue().toString();
            if (dtStart != null) start = dtStart.getDate().toString();
            if (dtEnd != null) end = dtEnd.getDate().toString();
            if (location != null) where = location.getValue().toString();

            //title이 비어있지 않다면 이제 ResponseCalendar을 만들 준비를 합니다.
            if(title == null) continue;
            ResponseCalendar nowCalendar = null;

            //시간 입력이 되어있지 않은 일정이라면 그대로 입력할 수 있습니다.
            if(start.length() == 10){
                if(localDate.toString().equals(dtStart.getDate().toString())){
                    nowCalendar = ResponseCalendar.builder()
                            .title(title)
                            .start(start)
                            .end(end)
                            .location(where)
                            .allDay(true)
                            .build();
                } else {
                    continue;
                }

                //시간이 입력되어 있는 일정이라면 시간의 시차(?)를 맞춰주기 위한 작업이 필요했습니다. ( 실제 일정의 시간보다 9시간이 빨리 나타나고 있었습니다. )
            } else {

                //LocalDateTime으로 변환하기 위해 필요없는 문자들을 제거해주었습니다.
                start = start.replace("Z", "").replace("T"," ");
                end = end.replace("Z", "").replace("T"," ");

                //시간을 계산해주기 위해서 LocalDateTime으로 변환해 주고, 9시간을 더해주었습니다.
                ldtStart = getLocalDateTime(start).plusHours(9);
                ldtEnd = getLocalDateTime(end).plusHours(9);

                //변환한 시간을 다시 start, end에 입력해줍니다.
                start = ldtStart.toString().replace("T"," ");
                end = ldtEnd.toString().replace("T"," ");

                //만약 날짜가 오늘의 날짜와 같고
                if(localDateTime.getYear() == ldtStart.getYear() && localDateTime.getMonthValue() == ldtStart.getMonthValue() && localDateTime.getDayOfMonth() == ldtStart.getDayOfMonth()){
                    //아직 현재시간이 지금 판단하는 일정 시간을 지나지 않았다면! ( 아직 지나지 않은 일정이라면!)
                    if(localDateTime.isBefore(ldtStart)){

                        //calendar Response를 만들어줍니다.
                        nowCalendar = ResponseCalendar.builder()
                                .title(title)
                                .start(start)
                                .end(end)
                                .location(where)
                                .allDay(false)
                                .build();
                    }
                }
            }

            //만약 nowCalendar가 null이 아니라면 List에 담아줍니다.
            if(nowCalendar != null) responseCalendars.add(nowCalendar);
        }

        return responseCalendars;
    }

    //String 형식의 Date를 LocalDateTime 형식으로 변환시켜줍니다.
    public static LocalDateTime getLocalDateTime(String datetime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime res = LocalDateTime.parse(datetime, formatter);
        return res;
    }
}
