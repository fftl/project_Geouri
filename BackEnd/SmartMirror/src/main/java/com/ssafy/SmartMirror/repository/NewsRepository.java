package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {

    List<News> findAllByPress(String press);

    @Transactional
    @Modifying
    @Query(value="truncate News", nativeQuery = true)
    void truncateNews();
}
