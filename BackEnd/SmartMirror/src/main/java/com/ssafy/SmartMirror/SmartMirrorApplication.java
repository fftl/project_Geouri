package com.ssafy.SmartMirror;

import com.ssafy.SmartMirror.config.NewsCrawling;
import com.ssafy.SmartMirror.domain.News;
import com.ssafy.SmartMirror.repository.NewsRepository;
import com.ssafy.SmartMirror.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;

@EnableScheduling // 뉴스 자동 크롤링을 위한 스케쥴러 추가
@SpringBootApplication
public class SmartMirrorApplication {


	public static void main(String[] args) throws IOException {
		SpringApplication.run(SmartMirrorApplication.class, args);
	}
}
