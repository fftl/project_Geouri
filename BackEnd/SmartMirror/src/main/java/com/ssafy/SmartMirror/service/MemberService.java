package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    public Member findByMemberKey(String memberKey) {
        // member_key 에 해당하는 멤버 정보 DB 에서 read
        Member member = memberRepository.findById(memberKey).orElse(null);
        return member;
    }

    public int updateKidsMode(String value, String memberKey) {
        int result = memberRepository.updateKidsMode(value.equals("true")?true:false, memberKey);
        return result;
    }

}
