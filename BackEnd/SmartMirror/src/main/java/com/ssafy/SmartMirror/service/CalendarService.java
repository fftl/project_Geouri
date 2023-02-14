package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Calendar;
import com.ssafy.SmartMirror.domain.Playlist;
import com.ssafy.SmartMirror.dto.RequestMember;
import com.ssafy.SmartMirror.repository.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarService {
    private CalendarRepository calendarRepository;

    @Autowired
    public CalendarService(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    public String findByMemberKey(String memberKey) {
        // memberKey 에 해당하는 캘린더 정보 DB 에서 read
        Calendar calendar = calendarRepository.findById(memberKey).orElse(null);
        if(calendar == null) return null; // 링크 없으면 null
        return calendar.getLink(); // 캘린더 링크 전달
    }


    public int updateLink(String link, String memberKey) {
        int result = 0;
        if(calendarRepository.findById(memberKey)==null) {
            Calendar calendar = Calendar.builder().memberKey(memberKey).link(link).build();
            if( calendarRepository.save(calendar)!=null) {
                result = 0;
            }
        } else {
            result = calendarRepository.updateLink(link, memberKey);
        }

        return result;
    }

    public Calendar saveCalendar(RequestMember requestMember, String memberKey) {
        Calendar calendar = Calendar.builder()
                .memberKey(memberKey)
                .link(requestMember.getCalendarLink())
                .build();

        Calendar newCalendar = calendarRepository.save(calendar);
        return newCalendar;

    }
}
