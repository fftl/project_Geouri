package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Mirror;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MirrorRepository extends JpaRepository<Mirror, String> {

}
