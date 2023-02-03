package com.ssafy.SmartMirror.config;

import com.ssafy.SmartMirror.domain.News;
import com.ssafy.SmartMirror.service.NewsService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class NewsCrawling {

    @Autowired
    private static NewsService newsService;

    public static void main(String[] args) throws IOException {
        crawling();
    }

    public static void crawling() throws IOException {

        // 크롤링 할 url
		String crawlingURL = "https://news.naver.com/main/ranking/popularDay.naver";

        // url의 내용을 담은 Jsoup document
		Document document = Jsoup.connect(crawlingURL).get();

        // 원하는 타입(?)의 정보 리스트 추출
        Elements contents = document.select(".rankingnews_box");

        for(Element content : contents) {
//            System.out.println(content.toString());
            System.out.println(content.select(".rankingnews_name"));
            System.out.println(content.select(".list_title"));
//            String press = content.select("rankingnews_name").text();
//            String title = content.select("").text();
//            newsService.saveNews(press, title); // 해당 뉴스 타이틀 저장

        }



    }

}
