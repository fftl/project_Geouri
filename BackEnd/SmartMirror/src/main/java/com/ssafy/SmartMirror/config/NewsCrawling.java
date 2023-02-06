package com.ssafy.SmartMirror.config;

import com.ssafy.SmartMirror.service.NewsService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class NewsCrawling {
    private NewsService newsService;

    @Autowired
    public NewsCrawling(NewsService newsService) {
        this.newsService = newsService;
    }

    @Scheduled(cron = "0 0 * * * *")
    public void crawling() throws IOException {
//        System.out.println("크롤링 재시작!!!!"+ LocalDateTime.now());

        // drop news 테이블
        newsService.truncate();

        // 크롤링 할 url
		String crawlingURL = "https://news.naver.com/main/ranking/popularDay.naver";

        // url의 내용을 담은 Jsoup document
		Document document = Jsoup.connect(crawlingURL).get();

        // 원하는 타입(?)의 정보 리스트 추출
        Elements contents = document.select(".rankingnews_box"); // 박스들 가져오기


        String newsPress = "";
        String newsTitle = "";
        for(Element content : contents) { // 각 박스
            newsPress = content.select(".rankingnews_name").text();

            Elements titles = content.select(".list_content");
            for(Element title : titles) { // 기사 타이틀만 불러오기
                newsTitle = title.select(".list_title").text();
                newsService.saveNews(newsPress, newsTitle); // 해당 뉴스 타이틀 저장
            }

        }

    }

}
