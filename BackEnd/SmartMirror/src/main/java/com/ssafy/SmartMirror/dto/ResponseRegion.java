package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class ResponseRegion {
    private String sidoName;
    private String gugunName;
    private String dongName;
    private double lng;
    private double lat;
}
