package com.ssafy.SmartMirror.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class RequestKidsGetScript {
    private String serialNumber;
    private Long memberKey;
    private Long scriptKey;
    private int reaction;
}
