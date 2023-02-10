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
public class Level {    @Id
private String memberKey; // 멤버 기본키
    private int lv; // 레벨(0~9 가능)
    private int exp; // 경험치(0~99 가능)
    private int brushCount; // 그날에 얻은 양치 포인트 횟수
    private int washCount; // 그날에 얻은 손씻기 횟수

}
