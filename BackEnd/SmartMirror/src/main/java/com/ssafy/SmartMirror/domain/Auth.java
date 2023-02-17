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
public class Auth { // 가입 시 이메일 인증을 위한 테이블
    @Id
    private Long authKey; // 기본키
    private String email; // 이메일 주소
    private String emailToken; // 인증 토큰
}
