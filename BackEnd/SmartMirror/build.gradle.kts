plugins {
	java
	id("org.springframework.boot") version "2.7.7"
	id("io.spring.dependency-management") version "1.0.15.RELEASE"
}

group = "com.ssafy"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	//springboot
	implementation("org.springframework.boot:spring-boot-starter-web")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	testImplementation("org.springframework.boot:spring-boot-starter-test")

	//database
	runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	//lombok
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	//other
	implementation("com.google.firebase:firebase-admin:9.1.1") //파이어베이스 storage 사용, 사진 저장
	implementation ("org.jsoup:jsoup:1.15.3")				   //크롤링, 네이버 랭킹뉴스 가져오기,
	implementation("org.mnode.ical4j:ical4j:4.0.0-beta2")	   //ical파일 읽기, 일정 리스트 가져오기
}

tasks.withType<Test> {
	useJUnitPlatform()
}
