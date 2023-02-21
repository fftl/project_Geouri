package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 거울 혹은 서버에 전송할 멤버 정보를 저장한다.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
public class ResponseMember {

    private String memberKey;
    private String nickname;
    private String birth;
    private String imgUrl;
    private boolean kidsMode;

    // 위젯 정보
    private String playlist; // 링크
    private String calendarUrl; // 일정링크
    private List<ResponseCalendar> calender; // 일정
    private ResponseWidget widget; // 위젯 (boolean 뉴스, 플레이리스트, 사진찍기, 일정)
    private ResponseRegion region; // 지역 (Double 경도, 위도)

    private String fortune; // 오늘의 한마디

    private ResponseLevel level; // 레벨 정보

    private String lastVisit; // 가장 마지막으로 거울에 왔던 방문시간, 방문한 적 없다면 null

    private List<ResponseNews> news;

    private int messageCnt;
}
