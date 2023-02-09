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
    private String calender; // 일정
    private ResponseWidget widget; // 위젯 (boolean 뉴스, 플레이리스트, 사진찍기, 일정)
    private ResponseRegion region; // 지역 (Double 경도, 위도)

    private String fortune; // 오늘의 한마디

    private ResponseLevel level; // 레벨 정보

    private List<ResponseNews> news;

}
