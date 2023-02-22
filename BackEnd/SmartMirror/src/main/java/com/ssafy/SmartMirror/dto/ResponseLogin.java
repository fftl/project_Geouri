package com.ssafy.SmartMirror.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseLogin {
    private String userKey;
    private String serialNumber;
}
