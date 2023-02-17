package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class ResponseLevel {
    private int lv;
    private int exp;
    private boolean levelUp;
    private boolean success; // 경험치 부여 성공 여부
}
