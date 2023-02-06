package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.domain.News;
import com.ssafy.SmartMirror.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    private NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository){
        this.newsRepository = newsRepository;
    }

    public int saveNews(String press, String title) {
        // 저장할 News 객체 새로 생성
        News news = News.builder()
                .press(press)
                .title(title)
                .build();

        // NewsRepository를 이용해서 DB에 insert한 뒤
        // 저장된 News 객체 반환
        News response = newsRepository.save(news);
        //reseponse 의 key값을 int로 변환하여 반환!
        return response.getNewsKey().intValue();
    }

    public List<News> findByPress(String press) {
        System.out.println("find by "+press);
        List<News> newsList = newsRepository.findAllByPress(press);
        return newsList;
    }

    public void truncate() {
        newsRepository.truncateNews();
    }
}