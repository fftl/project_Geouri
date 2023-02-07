package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Region;
import com.ssafy.SmartMirror.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionService {

    private RegionRepository regionRepository;

    @Autowired
    public RegionService(RegionRepository regionRepository){
        this.regionRepository = regionRepository;
    }

    public Region findByDongCode(String dongCode) {
        Region regionRes = regionRepository.findById(dongCode).orElse(null);
        return regionRes;
    }

    public String findBySidoNameAndGugunNameAndDongName(String sidoName, String gugunName, String dongName) {
        Region region = regionRepository.findBySidoNameAndGugunNameAndDongName(sidoName, gugunName, dongName);
        if(region ==null) return null;
        return region.getDongCode(); // 동코드 전달
    }
}
