package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@AllArgsConstructor
public class RequestUser {
    private String userKey;
    private String email;
    private String password;
    private String name;
    private String tel;
    private String birth;
}
