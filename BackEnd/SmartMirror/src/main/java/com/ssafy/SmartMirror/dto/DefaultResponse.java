package com.ssafy.SmartMirror.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DefaultResponse {
    private boolean success;
    private String msg;
    private Object data;

}