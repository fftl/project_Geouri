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
public class DongCode {
    @Id
    private String dongCode; // 동코드 (기본키)
    private String sido_name;
    private String gugun_name;
    private String dong_name;
    private double lng; // 위도
    private double lat; // 경도
}
