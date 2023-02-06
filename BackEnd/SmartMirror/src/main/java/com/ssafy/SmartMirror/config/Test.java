package com.ssafy.SmartMirror.config;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.Mirror;
import com.ssafy.SmartMirror.service.MemberService;
import com.ssafy.SmartMirror.service.MirrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class Test {
    static final int MORNING = 1; // 오전
    static final int AFTERNOON = 2; // 오후
    static final int EVENING = 3; // 저녁
    static final int ALLTIME = 4; // 평시

    @Autowired
    private MemberService memberService;
    @Autowired
    private MirrorService mirrorService;


    /**
     * 소문자, 대문자, 숫자(0~9)으로 구성된 랜덤난수를 생성합니다.
     * @param length
     * @return
     */
    public static String createRandomKey( int length ){
        char[] charaters = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                '0','1','2','3','4','5','6','7','8','9'};
        StringBuffer sb = new StringBuffer();
        Random rn = new Random();
        for( int i = 1 ; i < length+1 ; i++ ){
            sb.append( charaters[ rn.nextInt( charaters.length )] );
            if(i%4==0 && i != length) sb.append("-");

        }
        return sb.toString();
    }

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
    public boolean isValidAccess(String serialNumber, String memberKey) {
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
