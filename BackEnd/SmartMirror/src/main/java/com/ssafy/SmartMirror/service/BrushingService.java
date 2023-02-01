package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.repository.BrushingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrushingService {

    private BrushingRepository brushingRepository;

    @Autowired
    public BrushingService(BrushingRepository brushingRepository) {
        this.brushingRepository = brushingRepository;
    }
    public List<Brushing> findAllByMemberKey(Long memberKey){

        List<Brushing> brushingList = brushingRepository.findByMember(member);
        return brushingList;
    }
}
