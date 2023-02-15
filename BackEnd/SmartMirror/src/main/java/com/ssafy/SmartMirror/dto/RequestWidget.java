package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * 해당 멤버의 위젯 변경 정보를 받는다.
 */
@Builder
@AllArgsConstructor
@Getter
public class RequestWidget {
    private String cmd;
    private String value;
}