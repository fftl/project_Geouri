package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByMemberKeyTo(String memberKeyTo);
}
