-- 멤버별 dummy
-- #####################################################################################################################################################################
-- #####################################################################################################################################################################
-- 계정
insert into user (email, password, tel, birth, pwd_token) values ("sy980911@gmail.com", "1234", "010-9358-0053", "1998-09-11", null);
insert into user (email, password, tel, birth, pwd_token) values ("nohhyunjeong93@gmail.com", "9393", "010-7363-9393", "1993-02-03", null);
insert into user (email, password, tel, birth, pwd_token) values ("hello6815@naver.com", "2222", "010-4394-0988", "1996-12-21", null);
insert into user (email, password, tel, birth, pwd_token) values ("sbmsky@gmail.com", "7765", "010-4446-7765", "1996-11-04", null);
insert into user (email, password, tel, birth, pwd_token) values ("shimmumu@naver.com", "1234", "010-2037-9709", "1997-09-01", null);
insert into user (email, password, tel, birth, pwd_token) values ("fftl0785@gmail.com", "0710", "010-4562-0785", "1995-07-10", null);

-- 거울
insert into mirror (serial_number, nickname, user_key) values ("12345", "쏘영이네 똑쟁이 거울", 1);
insert into mirror (serial_number, nickname, user_key) values ("S23D-ED03S92", "광장동 우리집", 2);
insert into mirror (serial_number, nickname, user_key) values ("YOUNG12-HYUN21", "영현이네 거울아거울아", 3);
insert into mirror (serial_number, nickname, user_key) values ("MIRRORMIRROR", "미러미러", 4);
insert into mirror (serial_number, nickname, user_key) values ("JY97-SHIMMUMU", "정윤이의 거울 친구", 5);
insert into mirror (serial_number, nickname, user_key) values ("DM0710-SYEWHDK123", "동민이네 집!", 6);

-- 멤버 ( kids_mode: true(1) false(0)  / user_key: 본인에 맞는 거! )
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("쏘영이", "1998-09-11", "soyoung.jpg", 1, 1);
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("노노", "1993-02-03", "hyeonjung.jpg", 1, 1);
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("영현이", "1996-12-21", "younghyun.jpg", 1, 1);
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("BM", "1996-11-04", "bm.jpg", 0, 1);
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("짱윤", "1997-09-01", "JY.jpg", 1, 1);
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("동밍", "1995-07-10", "DM.jpg", 0, 1);

-- 위젯 ( 멤버키, 뉴스 여부, 플레이리스트 여부, 사진찍기 여부, 일정 여부 // 1이 true 고 0이 false 입니다 )
insert into widget (member_key, news, playlist, shot, calender) values (1, 1, 1, 0, 1);
insert into widget (member_key, news, playlist, shot, calender) values (2, 1, 1, 1, 1);
insert into widget (member_key, news, playlist, shot, calender) values (3, 0, 1, 0, 0);
insert into widget (member_key, news, playlist, shot, calender) values (4, 1, 1, 0, 1);
insert into widget (member_key, news, playlist, shot, calender) values (5, 1, 1, 1, 0);
insert into widget (member_key, news, playlist, shot, calender) values (6, 1, 1, 1, 0);

-- 플레이리스트 ( member_key: 본인에 맞는 거! )
insert into playlist (member_key, link) values (1, "https://youtube.com/playlist?list=PLRDEZ1-f6MAemydrZr4qK9JN3fXKCplNy");
insert into playlist (member_key, link) values (2, "https://youtube.com/playlist?list=PLph2xcT2CJAIzf_OkcVYjw8qhx7wyxE_D");
insert into playlist (member_key, link) values (3, "https://www.youtube.com/watch?v=kVdVe_pWHH4&list=PLensnm4tVH-4FCrJyBbuJccSSMq8reZa5");
insert into playlist (member_key, link) values (4, "https://www.youtube.com/playlist?list=PL4_4iSHjwuA9AhMh7z4v8oMFSSarqEq8-");
insert into playlist (member_key, link) values (5, "https://youtube.com/playlist?list=PLOSjsIj8E3hZEwP7IPQ4388fCjzrcfEuI");
insert into playlist (member_key, link) values (6, "https://www.youtube.com/watch?v=6RQ-bBdASvk");


-- 캘린더 ( member_key: 안넣고싶으면 null 하면 됩니다! )
insert into calendar (member_key, link) values (1, "https://calendar.google.com/calendar/ical/sy980911%40gmail.com/private-b100ab3c5330aff53dec9b13ab4615ad/basic.ics");
insert into calendar (member_key, link) values (2, "https://calendar.google.com/calendar/ical/nohhyunjeong93%40gmail.com/private-5348e203bdf09830ece6875026b74015/basic.ics");
insert into calendar (member_key, link) values (3, null);
insert into calendar (member_key, link) values (4, "https://calendar-ics.kakao.com/SfPf6k8UHnSP68gZDbSbdl4j6V9K7sFNNJ2ngHzlUkF8Ymdiof9hdji2e9lahh8n/talk.ics");
insert into calendar (member_key, link) values (5, null);
insert into calendar (member_key, link) values (6, null);

-- 지역 ( 특정 지역 법정동코드 검색하면 나와요!! )
insert into region (member_key, dong_code) values (1, "2823710700");
insert into region (member_key, dong_code) values (2, "1168011100");
insert into region (member_key, dong_code) values (3, "2818510600");
insert into region (member_key, dong_code) values (4, "4121010600");
insert into region (member_key, dong_code) values (5, "1117011500");
insert into region (member_key, dong_code) values (6, "4119010900");

-- 법정동코드
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("2823710700", "인천광역시", "부평구", "부개동", 126.7297474239, 37.4893497823);
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("1168011100", "서울특별시", "강남구", "세곡동", 127.104583, 37.464369 );
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("2818510600", "인천광역시", "연수구", "송도동", 126.645656, 37.384532);
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("4121010600", "경기도", "광명시", "일직동", 126.531533, 37.265020 );
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("1117011500", "서울특별시", "용산구", "산천동", 126.952396,37.535428);
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("4119010900", "경기도", "부천시", "상동", 126.7544075,37.5005775);


-- #####################################################################################################################################################################
-- #####################################################################################################################################################################
-- 소영
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values (1, '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values (1, '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values (1, '2023-02-01 11:30:00');
insert into visit (member_key, visit_time) values (1, '2023-02-01 15:23:00');
insert into visit (member_key, visit_time) values (1, '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values (1, '2023-02-02 08:03:00');
insert into visit (member_key, visit_time) values (1, '2023-02-02 12:03:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values (1, '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 11:33:18');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 18:28:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-02 08:05:11');
insert into brushing (member_key, brushing_time) values (1, '2023-02-02 12:06:38');

-- 현정
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values (2, '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values (2, '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values (2, '2023-02-01 11:30:00');
insert into visit (member_key, visit_time) values (2, '2023-02-01 15:23:00');
insert into visit (member_key, visit_time) values (2, '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values (2, '2023-02-02 08:03:00');
insert into visit (member_key, visit_time) values (2, '2023-02-02 12:03:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values (2, '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values (2, '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values (2, '2023-02-01 11:33:18');
insert into brushing (member_key, brushing_time) values (2, '2023-02-01 18:28:31');
insert into brushing (member_key, brushing_time) values (2, '2023-02-02 08:05:11');
insert into brushing (member_key, brushing_time) values (2, '2023-02-02 12:06:38');

-- 영현
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values (3, '2023-01-31 12:00:00');
insert into visit (member_key, visit_time) values (3, '2023-02-01 06:14:00');
insert into visit (member_key, visit_time) values (3, '2023-02-01 19:30:00');
insert into visit (member_key, visit_time) values (3, '2023-02-01 06:23:00');
insert into visit (member_key, visit_time) values (3, '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values (3, '2023-02-02 12:03:00');


-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values (3, '2023-01-31 12:02:31');
insert into brushing (member_key, brushing_time) values (3, '2023-02-01 06:15:00');
insert into brushing (member_key, brushing_time) values (3, '2023-02-01 19:33:18');
insert into brushing (member_key, brushing_time) values (3, '2023-02-01 06:28:31');
insert into brushing (member_key, brushing_time) values (3, '2023-02-02 12:05:11');

-- 보민
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values (4, '2023-01-31 08:00:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )

-- 정윤
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values (5, '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values (5, '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values (5, '2023-02-01 11:30:00');
insert into visit (member_key, visit_time) values (5, '2023-02-01 15:23:00');
insert into visit (member_key, visit_time) values (5, '2023-02-01 18:25:00');
insert into visit (member_key, visit_time) values (5, '2023-02-02 08:03:00');
insert into visit (member_key, visit_time) values (5, '2023-02-02 12:03:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values (5, '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values (5, '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values (5, '2023-02-01 11:33:18');
insert into brushing (member_key, brushing_time) values (5, '2023-02-01 18:28:31');
insert into brushing (member_key, brushing_time) values (5, '2023-02-02 08:05:11');
insert into brushing (member_key, brushing_time) values (5, '2023-02-02 12:06:38');

-- #####################################################################################################################################################################
-- #####################################################################################################################################################################
-- 동민
-- 방문기록 ( 거울에 방문했던 기록입니당 )
insert into visit (member_key, visit_time) values (6, '2023-01-31 08:00:00');
insert into visit (member_key, visit_time) values (6, '2023-02-01 08:14:00');
insert into visit (member_key, visit_time) values (6, '2023-02-02 11:30:00');
insert into visit (member_key, visit_time) values (6, '2023-02-02 15:23:00');
insert into visit (member_key, visit_time) values (6, '2023-02-03 08:03:00');
insert into visit (member_key, visit_time) values (6, '2023-02-03 12:03:00');
insert into visit (member_key, visit_time) values (6, '2023-02-03 18:25:00');

-- 양치기록 ( 양치한 기록입니다(키즈모드 설정 안할거면 안넣어도 됨!!) )
insert into brushing (member_key, brushing_time) values (6, '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values (6, '2023-02-01 08:15:00');
insert into brushing (member_key, brushing_time) values (6, '2023-02-02 11:33:18');
insert into brushing (member_key, brushing_time) values (6, '2023-02-02 18:28:31');
insert into brushing (member_key, brushing_time) values (6, '2023-02-03 08:05:11');
insert into brushing (member_key, brushing_time) values (6, '2023-02-03 12:06:38');


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