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
public class Calender {
    @Id
    private Long memberKey; // 멤버 기본키
    private String link;
}
