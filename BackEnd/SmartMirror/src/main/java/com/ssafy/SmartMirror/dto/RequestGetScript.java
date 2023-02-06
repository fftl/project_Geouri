package com.ssafy.SmartMirror.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class RequestGetScript {
    private String serialNumber;
    private String memberKey;
    private Long reqKey;
    private int reaction;
    private int type;
}
