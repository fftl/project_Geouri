package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Widget;
import com.ssafy.SmartMirror.repository.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {
    private WidgetRepository widgetRepository;
    @Autowired
    public WidgetService(WidgetRepository widgetRepository) {
        this.widgetRepository = widgetRepository;
    }

    public Widget findByMemberKey(String memberKey) {
        // serial_number 에 해당하는 거울 정보 DB 에서 read
        Widget widget = widgetRepository.findById(memberKey).orElse(null);
        return widget;
    }

    public int updateCalender(String value, String memberKey){
        int result = widgetRepository.updateCalender(value.equals("true")?true:false, memberKey);
        return result;
    }

    public int updateNews(String value, String memberKey){
        int result = widgetRepository.updateNews(value.equals("true")?true:false, memberKey);
        return result;
    }

    public int updatePlaylist(String value, String memberKey){
        int result = widgetRepository.updatePlaylist(value.equals("true")?true:false, memberKey);
        return result;
    }


}
