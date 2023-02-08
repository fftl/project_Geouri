package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Quiz { // 오늘의 한마디 (=포춘)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizKey; // pk
    private String question; // 문제 질문
    private String hint;    // 문제 힌트
    private String answer;  // 문제 답
}
