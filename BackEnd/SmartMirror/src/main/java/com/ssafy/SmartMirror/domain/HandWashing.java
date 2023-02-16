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
public class HandWashing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long handWashingKey; // 양치 키
    private String handWashingTime; // 양치 시간

    @ManyToOne
    @JoinColumn(referencedColumnName = "member_key", name = "memberKey")
    private Member member;
}
