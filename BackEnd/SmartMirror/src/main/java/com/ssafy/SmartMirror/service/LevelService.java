package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Level;
import com.ssafy.SmartMirror.repository.LevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LevelService {
    private LevelRepository levelRepository;

    @Autowired
    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public Level findByMemberKey(String memberKey) {
        // memberKey 에 해당하는 레벨 정보 DB 에서 read
        Level level = levelRepository.findById(memberKey).orElse(null);
        return level;
    }

    public int updateLv(int lv, String memberKey) {
        int result = levelRepository.updateLv(lv, memberKey);
        return result;
    }

    public int updateExp(int exp, String memberKey) {
        int result = levelRepository.updateExp(exp, memberKey);
        return result;
    }
}
