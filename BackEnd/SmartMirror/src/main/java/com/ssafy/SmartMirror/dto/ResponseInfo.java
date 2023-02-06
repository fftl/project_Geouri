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
public class ResponseInfo {

    private String memberKey;
    private String nickname;
    private String birth;
//    private String faceImage; // 줄필요 없는듯?
    private boolean kidsMode;

    private ResponseWidget widget; // 위젯 (boolean 뉴스, 플레이리스트, 사진찍기, 일정)
    private String playlist;
    private String calender;
    private ResponseRegion region; // 지역 (Double 경도, 위도)

    private List<ResponseNews> news;

}
