package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
@AllArgsConstructor
public class ResponseCalendar {
    String title;   // 일정 제목
    String start;   // 일정 시작
    String end;     // 일정 종료
    String location;// 일정 장소
    boolean allDay; // 하루종일 여부
}
