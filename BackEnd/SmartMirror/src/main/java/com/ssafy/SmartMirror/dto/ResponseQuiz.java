package com.ssafy.SmartMirror.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Builder
@Getter
@Setter
@AllArgsConstructor
public class ResponseQuiz {

    private String question;
    private String hint;
    private String answer;

}