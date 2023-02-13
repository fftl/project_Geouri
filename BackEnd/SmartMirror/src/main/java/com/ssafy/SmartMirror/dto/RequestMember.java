package com.ssafy.SmartMirror.dto;

import lombok.*;

/**
 * 거울이 보낸 멤버 요청을 받는다.
 */
@Getter
@ToString
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestMember {

    private String userKey; // 유저 키
    private String nickname;
    private String birth;
    private String imgUrl; // 학습이미지
    private boolean kidsMode; // 아이여부

    // 위젯 정보
    private boolean playlist;
    private boolean calendar;
    private boolean news;
    private String dongCode; // 법정동코드
    private String playlistLink;
    private String calendarLink; // 일정


}