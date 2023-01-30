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
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberKey;
    private String nickname;
    private String birth;
    private String faceImage;
    private boolean kidsMods;
    @ManyToOne
    @JoinColumn(name = "userKey")
    private User user;
    @OneToMany(mappedBy = "member")
    private List<Snapshot> snapshotList = new ArrayList<>();
}
