package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class ResponseWidget {
    private boolean news;
    private boolean playlist;
    private boolean shot;
    private boolean calender;
}
