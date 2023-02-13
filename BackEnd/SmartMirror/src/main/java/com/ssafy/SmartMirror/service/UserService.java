package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.User;
import com.ssafy.SmartMirror.dto.RequestUser;
import com.ssafy.SmartMirror.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //userKey를 이용해 유저의 정보를 조회합니다.
    public User findByUserKey(String userKey) {
        User user = userRepository.findById(userKey).orElse(null);
        return user;
    }

    public User saveUser(RequestUser requestUser){
        return null;
    }
}
