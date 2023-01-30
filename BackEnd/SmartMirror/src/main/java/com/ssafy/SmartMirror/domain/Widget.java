package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Widget {
    @Id
    private Long memberKey; // 멤버 기본키
    private boolean news;
    private boolean playlist;
    private boolean shot;
    private boolean calender;

}
