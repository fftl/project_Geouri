package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AUTO_INCREMENT 설정 (id값이 null일 경우 자동 생성)
    private long userKey;
    private String email;
    private String password;
    private String tel;
    private String birth;
    private String pwdToken;

    @OneToMany(mappedBy = "user")
    private List<Member> memberList = new ArrayList<>();
}
