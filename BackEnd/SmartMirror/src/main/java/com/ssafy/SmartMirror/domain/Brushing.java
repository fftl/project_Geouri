package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Brushing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long brushingKey; // 멤버 기본키
    private String brushingTime; // 양치 시간

    @ManyToOne
    @JoinColumn(referencedColumnName = "member_key", name = "memberKey")
    private Member member;
}
