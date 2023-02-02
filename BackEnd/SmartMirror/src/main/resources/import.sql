-- 계정
insert into user (email, password, tel, birth, pwd_token) values ("sy980911@gmail.com", "1234", "010-9358-0053", "1998-09-11", null);

-- 거울
insert into mirror (serial_number, nickname, user_key) values ("A201_12345", "쏘영이네 똑쟁이 거울", 1);

-- 멤버
insert into member (nickname, birth, face_image, kids_mode, user_key) values ("쏘영이", "1998-09-11", "soyoung.jpg", 1, 1);

-- 위젯
insert into widget (member_key, news, playlist, shot, calender) values (1, 1, 1, 0, 1);

-- 플레이리스트
insert into playlist (member_key, link) values (1, "https://youtube.com/playlist?list=PLRDEZ1-f6MAemydrZr4qK9JN3fXKCplNy");

-- 캘린더
insert into calendar (member_key, link) values (1, "https://calendar.google.com/calendar/ical/sy980911%40gmail.com/private-b100ab3c5330aff53dec9b13ab4615ad/basic.ics");

-- 지역
insert into region (member_key, dong_code) values (1, "2823710700");

-- 방문기록
insert into visit (member_key, visit_time) values (1, '2023-01-31 08:00:00');

-- 양치기록
insert into brushing (member_key, brushing_time) values (1, '2023-01-31 08:02:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 08:02:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 08:03:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 08:04:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 08:05:31');
insert into brushing (member_key, brushing_time) values (1, '2023-02-01 08:06:31');

-- 법정동코드
insert into dong_code (dong_code, sido_name, gugun_name, dong_name, lat, lng) values ("2823710700", "인천광역시", "부평구", "부개동", 37.4893497823, 126.7297474239);

-- 어린이 멘트 모음
insert into kids_script (script) values ("잘잤어? 좋은 아침이야!");
insert into kids_script (script) values ("상쾌하게 양치를 시작해볼까?");
insert into kids_script (script) values ("오늘은 아직 양치를 안했네 우리 양치하러 가볼까?");
insert into kids_script (script) values ("좋았어! 나랑 같이 양치하자!");

-- 어린이 멘트 응답관계
insert into kids_response (res_key, req_key, reaction, type) values (1,0,0,1);
insert into kids_response (res_key, req_key, reaction, type) values (2,1,1,2);
insert into kids_response (res_key, req_key, reaction, type) values (3,1,1,2);
insert into kids_response (res_key, req_key, reaction, type) values (4,2,1,2);

--- 일반 멘트 모음

-- 일반 멘트 응답관게

