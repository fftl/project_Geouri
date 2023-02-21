package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @Column(name="user_key")
    private String userKey;
    private String email;
    private String password;
    private String tel;
    private String birth;
    private String pwdToken;
    private boolean noticeMode;

    @OneToMany(mappedBy = "user")
    private List<Member> memberList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Mirror> mirrorList = new ArrayList<>();
}
