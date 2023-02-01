package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.DongCode;
import com.ssafy.SmartMirror.domain.Region;
import com.ssafy.SmartMirror.repository.DongCodeRepository;
import com.ssafy.SmartMirror.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionService {
    private RegionRepository regionRepository;
    private DongCodeRepository dongCodeRepository;

    @Autowired
    public RegionService(RegionRepository regionRepository,
                         DongCodeRepository dongCodeRepository) {
        this.regionRepository = regionRepository;
        this.dongCodeRepository = dongCodeRepository;
    }

    public DongCode findByMemberKey(Long memberKey) {
        Region region = regionRepository.findById(memberKey).orElse(null);
        if(region==null) return null; // 등록된 지역이 없을 경우 null 리턴
        DongCode dongCode = dongCodeRepository.findById(region.getDongCode()).orElse(null);
        return dongCode;
    }
}
