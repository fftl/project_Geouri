package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class ResponseUser {

    private String userKey;
    private String email;
    private String tel;
    private String birth;
    private List<ResponseMirror> mirrorList;



}
