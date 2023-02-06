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
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageKey;
    private String memberKeyFrom;
    private String memberKeyTo;

    private String time;
    private String content;
    private boolean read_or_not;

    @ManyToOne
    @JoinColumn(referencedColumnName = "member_key", name = "memberKey")
    private Member member;
}
