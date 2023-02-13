package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Calendar;
import com.ssafy.SmartMirror.domain.DongCode;
import com.ssafy.SmartMirror.dto.RequestMember;
import com.ssafy.SmartMirror.repository.DongCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DongCodeService {
    private DongCodeRepository dongCodeRepository;

    @Autowired
    public DongCodeService(DongCodeRepository dongCodeRepository) {
        this.dongCodeRepository = dongCodeRepository;
    }

    public String findByMemberKey(String memberKey) { // 해당 멤버의 동코드 반환
        DongCode dongCode = dongCodeRepository.findById(memberKey).orElse(null);
        if(dongCode==null) return null; // 등록된 지역이 없을 경우 null 리턴
        return dongCode.getDongCode();
    }

    public int updateDongCode(String value, String memberKey) {
        int result = dongCodeRepository.updateDongCode(value, memberKey);
        return result;
    }

    public DongCode saveDongCode(RequestMember requestMember, String memberKey) {
        DongCode dongCode = DongCode.builder()
                .memberKey(memberKey)
                .dongCode(requestMember.getDongCode())
                .build();

        DongCode newDongCode = dongCodeRepository.save(dongCode);
        return newDongCode;
    }
}
