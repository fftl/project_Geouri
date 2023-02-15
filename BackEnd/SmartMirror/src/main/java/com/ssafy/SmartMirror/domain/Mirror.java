package com.ssafy.SmartMirror.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mirror {

    @Id
    private String serialNumber;
    private String nickname;

    @ManyToOne
    @JoinColumn(referencedColumnName = "user_key", name = "userKey")
    private User user;
}
