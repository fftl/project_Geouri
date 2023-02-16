package com.ssafy.SmartMirror.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResponseDefault {
    private boolean success;
    private String msg;
    private Object data;

}