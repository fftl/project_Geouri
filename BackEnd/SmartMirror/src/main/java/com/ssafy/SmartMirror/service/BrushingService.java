package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.repository.BrushingRepository;
import com.ssafy.SmartMirror.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrushingService {

    private BrushingRepository brushingRepository;
    private MemberRepository memberRepository;

    @Autowired
    public BrushingService(BrushingRepository brushingRepository, MemberRepository memberRepository) {
        this.brushingRepository = brushingRepository;
        this.memberRepository = memberRepository;
    }

    public List<Brushing> findAllByMember(Long memberKey){
        System.out.println("test1");
        Member member = memberRepository.findById(memberKey).get();
        List<Brushing> brushingList = brushingRepository.findAllByMember(member);
        System.out.println("test2");
        return brushingList;
    }
}
