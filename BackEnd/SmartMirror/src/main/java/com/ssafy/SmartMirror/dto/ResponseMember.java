package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class ResponseMember {
    private String memberKey;
    private String nickname;
    private String imgUrl;

    private boolean kidsMode;
    private String playlist;
    private String calender;
    private ResponseWidget widget; // 위젯 (boolean 뉴스, 플레이리스트, 사진찍기, 일정)
    private ResponseRegion region; // 지역 (Double 경도, 위도)

}
