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
public class RequestInfo {
    private String serialNumber;
    private String memberKey;
}