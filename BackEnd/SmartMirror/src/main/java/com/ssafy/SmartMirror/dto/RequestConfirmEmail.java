package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RequestConfirmEmail {

    private String email;
    private String token;
}
