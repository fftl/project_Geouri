package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
