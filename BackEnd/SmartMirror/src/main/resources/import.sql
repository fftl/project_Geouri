-- 멤버별 dummy
-- #####################################################################################################################################################################
-- #####################################################################################################################################################################
-- 계정
insert into user (user_key, email, password, tel, birth, pwd_token) values ("Fyw3-DOwW", "sy980911@gmail.com", "1234", "010-9358-0053", "1998-09-11", null);

-- 거울
insert into mirror (serial_number, nickname, user_key) values ("8DLL-44yh-x7vB-VuWK", "1조의 해피해피 거울", "Fyw3-DOwW");

-- 멤버 ( kids_mode: true(1) false(0)  / user_key: 본인에 맞는 거! )
insert into member (member_key, nickname, birth, img_url, kids_mode, user_key) values ("nh3b-494F", "쏘영이", "1998-09-11", "soyoung.jpg", 1, "Fyw3-DOwW");
insert into member (member_key, nickname, birth, img_url, kids_mode, user_key) values ("B7T3-jX6r", "노노", "1993-02-03", "hyeonjung.jpg", 1, "Fyw3-DOwW");
insert into member (member_key, nickname, birth, img_url, kids_mode, user_key) values ("GhhR-Habi", "영혀니", "1996-12-21", "younghyun.jpg", 1, "Fyw3-DOwW");
insert into member (member_key, nickname, birth, img_url, kids_mode, user_key) values ("60lm-pxTc", "BM", "1996-11-04", "bm.jpg", 1, "Fyw3-DOwW");
insert into member (member_key, nickname, birth, img_url, kids_mode, user_key) values ("fSBS-lCHb", "짱윤", "1997-09-01", "JY.jpg", 1, "Fyw3-DOwW");
insert into member (member_key, nickname, birth, img_url, kids_mode, user_key) values ("DnGc-bHAM", "동밍", "1995-07-10", "DM.jpg", 0, "Fyw3-DOwW");

-- 멤버 ( kids_mode: true(1) false(0)  / user_key: 본인에 맞는 거! )
insert into level (member_key, lv, exp) values ("nh3b-494F", 1, 10);
insert into level (member_key, lv, exp) values ("B7T3-jX6r", 2, 40);
insert into level (member_key, lv, exp) values ("GhhR-Habi", 3, 80);
insert into level (member_key, lv, exp) values ("60lm-pxTc", 4, 20);
insert into level (member_key, lv, exp) values ("fSBS-lCHb", 5, 0);
insert into level (member_key, lv, exp) values ("DnGc-bHAM", 6, 70);


-- 위젯 ( 멤버키, 뉴스 여부, 플레이리스트 여부, 사진찍기 여부, 일정 여부 // 1이 true 고 0이 false 입니다 )
insert into widget (member_key, news, playlist, calender) values ("nh3b-494F", 1, 1, 1);
insert into widget (member_key, news, playlist, calender) values ("B7T3-jX6r", 1, 1, 1);
insert into widget (member_key, news, playlist, calender) values ("GhhR-Habi", 0, 1, 0);
insert into widget (member_key, news, playlist, calender) values ("60lm-pxTc", 1, 1, 1);
insert into widget (member_key, news, playlist, calender) values ("fSBS-lCHb", 1, 1, 0);
insert into widget (member_key, news, playlist, calender) values ("DnGc-bHAM", 1, 1, 0);

-- 플레이리스트 ( member_key: 본인에 맞는 거! )
insert into playlist (member_key, link) values ("nh3b-494F", "https://youtube.com/playlist?list=PLRDEZ1-f6MAemydrZr4qK9JN3fXKCplNy");
insert into playlist (member_key, link) values ("B7T3-jX6r", "https://youtube.com/playlist?list=PLph2xcT2CJAIzf_OkcVYjw8qhx7wyxE_D");
insert into playlist (member_key, link) values ("GhhR-Habi", "https://www.youtube.com/watch?v=kVdVe_pWHH4&list=PLensnm4tVH-4FCrJyBbuJccSSMq8reZa5");
insert into playlist (member_key, link) values ("60lm-pxTc", "https://www.youtube.com/playlist?list=PL4_4iSHjwuA9AhMh7z4v8oMFSSarqEq8-");
insert into playlist (member_key, link) values ("fSBS-lCHb", "https://youtube.com/playlist?list=PLOSjsIj8E3hZEwP7IPQ4388fCjzrcfEuI");
insert into playlist (member_key, link) values ("DnGc-bHAM", "https://www.youtube.com/watch?v=6RQ-bBdASvk");


-- 캘린더 ( member_key: 안넣고싶으면 null 하면 됩니다! )
insert into calendar (member_key, link) values ("nh3b-494F", "https://calendar.google.com/calendar/ical/sy980911%40gmail.com/private-b100ab3c5330aff53dec9b13ab4615ad/basic.ics");
insert into calendar (member_key, link) values ("B7T3-jX6r", "https://calendar.google.com/calendar/ical/nohhyunjeong93%40gmail.com/private-5348e203bdf09830ece6875026b74015/basic.ics");
insert into calendar (member_key, link) values ("GhhR-Habi", null);
insert into calendar (member_key, link) values ("60lm-pxTc", "https://calendar-ics.kakao.com/SfPf6k8UHnSP68gZDbSbdl4j6V9K7sFNNJ2ngHzlUkF8Ymdiof9hdji2e9lahh8n/talk.ics");
insert into calendar (member_key, link) values ("fSBS-lCHb", null);
insert into calendar (member_key, link) values ("DnGc-bHAM", null);

-- 지역 ( 특정 지역 법정동코드 검색하면 나와요!! )
insert into dong_code (member_key, dong_code) values ("nh3b-494F", "2823710700");
insert into dong_code (member_key, dong_code) values ("B7T3-jX6r", "1168011100");
insert into dong_code (member_key, dong_code) values ("GhhR-Habi", "2818510600");
insert into dong_code (member_key, dong_code) values ("60lm-pxTc", "4121010600");
insert into dong_code (member_key, dong_code) values ("fSBS-lCHb", "1117011500");
insert into dong_code (member_key, dong_code) values ("DnGc-bHAM", "4119010900");

-- #####################################################################################################################################################################
-- #####################################################################################################################################################################
-- 소영
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-02-01 11:30:00');
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-02-01 15:23:00');
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-02-02 08:03:00');
insert into visit (member_key, visit_time) values ("nh3b-494F", '2023-02-07 16:03:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values ("nh3b-494F", '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values ("nh3b-494F", '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values ("nh3b-494F", '2023-02-01 11:33:18');
insert into brushing (member_key, brushing_time) values ("nh3b-494F", '2023-02-01 18:28:31');
insert into brushing (member_key, brushing_time) values ("nh3b-494F", '2023-02-02 08:05:11');
insert into brushing (member_key, brushing_time) values ("nh3b-494F", '2023-02-07 12:30:38');

-- 현정
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-02-01 11:30:00');
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-02-01 15:23:00');
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-02-02 08:03:00');
insert into visit (member_key, visit_time) values ("B7T3-jX6r", '2023-02-02 12:03:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values ("B7T3-jX6r", '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values ("B7T3-jX6r", '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values ("B7T3-jX6r", '2023-02-01 11:33:18');
insert into brushing (member_key, brushing_time) values ("B7T3-jX6r", '2023-02-01 18:28:31');
insert into brushing (member_key, brushing_time) values ("B7T3-jX6r", '2023-02-02 08:05:11');
insert into brushing (member_key, brushing_time) values ("B7T3-jX6r", '2023-02-02 12:06:38');

-- 영현
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values ("GhhR-Habi", '2023-01-31 12:00:00');
insert into visit (member_key, visit_time) values ("GhhR-Habi", '2023-02-01 06:14:00');
insert into visit (member_key, visit_time) values ("GhhR-Habi", '2023-02-01 19:30:00');
insert into visit (member_key, visit_time) values ("GhhR-Habi", '2023-02-01 06:23:00');
insert into visit (member_key, visit_time) values ("GhhR-Habi", '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values ("GhhR-Habi", '2023-02-02 12:03:00');


-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values ("GhhR-Habi", '2023-01-31 12:02:31');
insert into brushing (member_key, brushing_time) values ("GhhR-Habi", '2023-02-01 06:15:00');
insert into brushing (member_key, brushing_time) values ("GhhR-Habi", '2023-02-01 19:33:18');
insert into brushing (member_key, brushing_time) values ("GhhR-Habi", '2023-02-01 06:28:31');
insert into brushing (member_key, brushing_time) values ("GhhR-Habi", '2023-02-02 12:05:11');

-- 보민
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values ("60lm-pxTc", '2023-01-31 08:00:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )

-- 정윤
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-02-01 11:30:00');
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-02-01 15:23:00');
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-02-02 08:03:00');
insert into visit (member_key, visit_time) values ("fSBS-lCHb", '2023-02-02 12:03:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values ("fSBS-lCHb", '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values ("fSBS-lCHb", '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values ("fSBS-lCHb", '2023-02-01 11:33:18');
insert into brushing (member_key, brushing_time) values ("fSBS-lCHb", '2023-02-01 18:28:31');
insert into brushing (member_key, brushing_time) values ("fSBS-lCHb", '2023-02-02 08:05:11');
insert into brushing (member_key, brushing_time) values ("fSBS-lCHb", '2023-02-02 12:06:38');

-- #####################################################################################################################################################################
-- #####################################################################################################################################################################
-- 동민
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-02-02 11:30:00');
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-02-02 15:23:00');
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-02-03 08:03:00');
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-02-03 12:03:00');
insert into visit (member_key, visit_time) values ("DnGc-bHAM", '2023-02-03 18:25:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values ("DnGc-bHAM", '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values ("DnGc-bHAM", '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values ("DnGc-bHAM", '2023-02-02 11:33:18');
insert into brushing (member_key, brushing_time) values ("DnGc-bHAM", '2023-02-02 18:28:31');
insert into brushing (member_key, brushing_time) values ("DnGc-bHAM", '2023-02-03 08:05:11');
insert into brushing (member_key, brushing_time) values ("DnGc-bHAM", '2023-02-03 12:06:38');


-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
-- 멘트

-- 어린이 멘트 모음
insert into kids_script (script, type) values ("안녕! 잘잤어? 좋은 아침이야!",1);
insert into kids_script (script, type) values ("안녕! 점심은 맛있게 먹었어?",2);
insert into kids_script (script, type) values ("어서와 오늘 하루도 수고했어~",3);
insert into kids_script (script, type) values ("안녕!",4);
insert into kids_script (script, type) values ("우리 상쾌하게 같이 양치해볼까?",5);
insert into kids_script (script, type) values ("오늘은 아직 양치를 안했네! 우리 양치하러 갈까?",5);
insert into kids_script (script, type) values ("좋았어! 나랑 같이 양치 시작하자!",6);
insert into kids_script (script, type) values ("손 씻으러 왔구나?!",7);
insert into kids_script (script, type) values ("좋아! 나랑 같이 손씻어보자!",8);
insert into kids_script (script, type) values ("그래도 해야돼ㅠㅜ 하면 안될까?",5);
insert into kids_script (script, type) values ("엄마가 혼낸대…",5);
insert into kids_script (script, type) values ("헐 맛없었구나ㅠㅠ 그래두 우리 양치해볼까?",5);
insert into kids_script (script, type) values ("그렇구나ㅠㅠ 대신 손씻으면서 기분전환해볼까?",7);
insert into kids_script (script, type) values ("어쩔수없어! 자 셋하면 양치 시작한다! 하나둘셋!",6);
insert into kids_script (script, type) values ("기본인사에 부정적 표현을 한 경우입니다",4);
insert into kids_script (script, type) values ("손씻어야 착한 어린이야!",7);
insert into kids_script (script, type) values ("손에는 세균이 정말 많다구!! 할거지?",7);
insert into kids_script (script, type) values ("그래도 손씻기 해야해! 자시이작~! ",8);


-- 어린이 멘트 응답관계

-- 최초 인삿말
insert into kids_response (res_key, req_key, reaction, res_type) values (1,0,0,1);
insert into kids_response (res_key, req_key, reaction, res_type) values (2,0,0,2);
insert into kids_response (res_key, req_key, reaction, res_type) values (3,0,0,3);
insert into kids_response (res_key, req_key, reaction, res_type) values (4,0,0,4);

-- 시간 타입별 인사의 응답들
insert into kids_response (res_key, req_key, reaction, res_type) values (5,1,1,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (8,1,1,7);
insert into kids_response (res_key, req_key, reaction, res_type) values (15,1,0,4);

insert into kids_response (res_key, req_key, reaction, res_type) values (5,2,1,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (8,2,1,7);
insert into kids_response (res_key, req_key, reaction, res_type) values (15,2,0,4);

insert into kids_response (res_key, req_key, reaction, res_type) values (5,3,1,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (8,3,1,7);
insert into kids_response (res_key, req_key, reaction, res_type) values (15,3,0,4);

insert into kids_response (res_key, req_key, reaction, res_type) values (5,4,1,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (8,4,1,7);
insert into kids_response (res_key, req_key, reaction, res_type) values (15,4,0,4);

-- 양치 제안, 손씻기 제안
insert into kids_response (res_key, req_key, reaction, res_type) values (7,5,1,6);
insert into kids_response (res_key, req_key, reaction, res_type) values (10,5,0,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (7,6,1,6);
insert into kids_response (res_key, req_key, reaction, res_type) values (10,6,0,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (9,8,1,8);
insert into kids_response (res_key, req_key, reaction, res_type) values (7,10,1,6);
insert into kids_response (res_key, req_key, reaction, res_type) values (11,10,0,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (7,11,1,6);
insert into kids_response (res_key, req_key, reaction, res_type) values (14,11,0,6);
insert into kids_response (res_key, req_key, reaction, res_type) values (7,12,1,6);
insert into kids_response (res_key, req_key, reaction, res_type) values (9,13,1,8);
insert into kids_response (res_key, req_key, reaction, res_type) values (5,15,1,5);
insert into kids_response (res_key, req_key, reaction, res_type) values (8,15,1,7);
insert into kids_response (res_key, req_key, reaction, res_type) values (9,16,1,8);
insert into kids_response (res_key, req_key, reaction, res_type) values (17,16,0,7);
insert into kids_response (res_key, req_key, reaction, res_type) values (9,17,1,8);
insert into kids_response (res_key, req_key, reaction, res_type) values (18,17,0,8);

--- 일반 멘트 모음
-- 일반 멘트 응답관게


-- 포춘
insert into fortune (sentence) values ("오늘은 왠지 달달한 게 땡기는걸?");
insert into fortune (sentence) values ("오늘 나 좀 매력적인 듯?");
insert into fortune (sentence) values ("오늘은 떡볶이!");
insert into fortune (sentence) values ("난 정말 완벽해!");
insert into fortune (sentence) values ("현실 감각이 중요한 때입니다.");
insert into fortune (sentence) values ("많은 사람들이 따르는 날입니다.");
insert into fortune (sentence) values ("늘! 웃음 가득한 당신");
insert into fortune (sentence) values ("조금 서툴러도 돼. 처음엔 누구나 서툰 법이야 :)");
insert into fortune (sentence) values ("좋아하는 걸 계속하려면 건강해야해. 운동하자!");
insert into fortune (sentence) values ("모든 게 잘 될 것만 같은 하루~");
insert into fortune (sentence) values ("너는 왜 매일 같은 티만 입어? 큐티…♥");
insert into fortune (sentence) values ("내일은 내일의 태양이 뜬다");
insert into fortune (sentence) values ("행운의 숫자: 1");
insert into fortune (sentence) values ("행운의 숫자: 2");
insert into fortune (sentence) values ("행운의 숫자: 3");
insert into fortune (sentence) values ("행운의 숫자: 4");
insert into fortune (sentence) values ("행운의 숫자: 5");
insert into fortune (sentence) values ("행운의 숫자: 6");
insert into fortune (sentence) values ("행운의 숫자: 7");
insert into fortune (sentence) values ("행운의 숫자: 8");
insert into fortune (sentence) values ("행운의 숫자: 9");
insert into fortune (sentence) values ("오늘 내 행운의 색은 노랑!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 빨강!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 초록!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 파랑!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 보라!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 하양!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 주황!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 검정!");
insert into fortune (sentence) values ("오늘 내 행운의 색은 분홍!");

-- 퀴즈
insert into Quiz (question, hint, answer) values ("이 동물은 꼬리가 엄청 길대. 그리고 바나나를 진짜진짜 좋아한대. 나무도 엄청 잘 타.", "이 동물은 우끼끼 하고 운대", "원숭이");
insert into Quiz (question, hint, answer) values ("이 동물은 물가에 살고, 몸이 길고 커. 그리고 입이 엄청 크고 이빨이 많고 날카롭대.", "늪지대가 나타나면 이 동물이 나올지도 몰라", "악어");
insert into Quiz (question, hint, answer) values ("이 동물은 몸집이 크고, 다리가 4개래. 그리고 코가 엄~청 길고 귀가 커.", "먹이를 주면 코로 받아서 먹는 동물이래", "코끼리");
insert into Quiz (question, hint, answer) values ("이 동물은 귀가 엄청 길고 조그만한 동물이야. 깡총깡총 뛰어다니고 당근과 채소를 좋아하는 동물이야", "이 동물은 엄청 빠른데도 거북이랑 달리기 시합해서 진 적이 있대!", "토끼");
insert into Quiz (question, hint, answer) values ("이 동물은 크고 딱딱 등딱지를 가지고 있어, 그리고 땅에서 느리게 엉금엉금 걷는대.", "이 동물은 엉금엉금 느리게 걷는대도 엄청 빠른 토끼랑 경주해서 이긴 적이 있대!", "거북이");
insert into Quiz (question, hint, answer) values ("이 동물은 뿔이 있고, 주로 농장에서 살아. 그리고 우리한테 맛있는 우유를 준대", "이 동물은 음메~ 하고 운대", "소");
insert into Quiz (question, hint, answer) values ("이 동물은 핑크빛에 뚱뚱하고, 다리가 네개인 동물이야. 그리고 꼬리가 짧고 말려 있어.", "이 동물은 꿀꿀 거리는걸 좋아해", "돼지");
insert into Quiz (question, hint, answer) values ("이 동물은 쥐를 잡는걸 좋아하고, 집에서 많이 키우는 동물이야. 수염과 털이 나 있어.", "가끔 다가와서 야옹거리는 동물이야", "고양이");
insert into Quiz (question, hint, answer) values ("이 동물은 깃털이 많고, 땅에서 두발로 걷는  동물이야. 그리고 알을 낳고 꼬끼오 하고 울지.", "맛있는 달걀을 낳아주는 고마운 동물이야", "닭");