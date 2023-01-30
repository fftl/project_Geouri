package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Fortune { // 오늘의 한마디 (=포춘)
    @Id
    private Long fortuneKey; // 기본키
    private String sentence; // 오늘의 한마디 문장
}
