package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * 거울 혹은 서버에 전송할 멤버 정보를 저장한다.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
public class ResponseMember {

    private Long memberKey;
    private String nickname;
    private String birth;
    private String faceImage;
    private boolean kidsMode;

    private Widget widget; // 위젯 (boolean 뉴스, 플레이리스트, 사진찍기, 일정)
    private String playlist;
    private String calender;
    private Region region; // 지역 (Double 경도, 위도)

    class Widget {
        boolean news;
        boolean playlist;
        boolean shot;
        boolean calender;
    }
    
    class Region {
        Double lng;
        Double lat;
    }
}
