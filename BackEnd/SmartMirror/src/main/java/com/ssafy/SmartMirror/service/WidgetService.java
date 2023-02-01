package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Widget;
import com.ssafy.SmartMirror.repository.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {
    private WidgetRepository widgetRepository;
    @Autowired
    public WidgetService(WidgetRepository widgetRepository) {
        this.widgetRepository = widgetRepository;
    }

    public Widget findByMemberKey(Long memberKey) {
        // serial_number 에 해당하는 거울 정보 DB 에서 read
        Widget widget = widgetRepository.findById(memberKey).orElse(null);
        return widget;
    }
}
