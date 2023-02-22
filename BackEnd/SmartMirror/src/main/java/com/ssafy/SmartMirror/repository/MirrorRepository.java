package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Mirror;
import com.ssafy.SmartMirror.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MirrorRepository extends JpaRepository<Mirror, String> {
    Mirror findByUser(User user);
}
