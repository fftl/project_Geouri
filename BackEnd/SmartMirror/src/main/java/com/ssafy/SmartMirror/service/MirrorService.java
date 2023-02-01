package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Mirror;
import com.ssafy.SmartMirror.repository.MirrorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MirrorService {
    private MirrorRepository mirrorRepository;
    @Autowired
    public MirrorService(MirrorRepository mirrorRepository) {
        this.mirrorRepository = mirrorRepository;
    }

    public Mirror findBySerialNumber(String serialNumber) {
        // serial_number 에 해당하는 거울 정보 DB 에서 read
        Mirror mirror = mirrorRepository.findById(serialNumber).orElse(null);
        return mirror;
    }

}
