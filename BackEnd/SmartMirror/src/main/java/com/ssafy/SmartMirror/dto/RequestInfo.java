package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * 거울이 보낸 멤버 요청을 받는다.
 */
@Builder
@AllArgsConstructor
@Getter
public class RequestInfo {
    private String serialNumber;
    private String memberKey;
}