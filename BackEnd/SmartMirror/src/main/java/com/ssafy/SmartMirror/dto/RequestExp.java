package com.ssafy.SmartMirror.dto;

import lombok.*;

@Getter
@ToString
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestExp {
    private String serialNumber;
    private String memberKey;
    private String mission;
}
