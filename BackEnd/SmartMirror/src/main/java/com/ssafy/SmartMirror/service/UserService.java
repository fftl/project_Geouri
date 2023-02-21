package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.User;
import com.ssafy.SmartMirror.dto.RequestUser;
import com.ssafy.SmartMirror.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    //email을 이용해 유저의 정보를 조회합니다.
    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    public User saveUser(RequestUser requestUser, String userKey){
        User insertUser = User.builder()
                .userKey(userKey)
                .email(requestUser.getEmail())
                .password(requestUser.getPassword())
                .tel(requestUser.getTel())
                .birth(requestUser.getBirth())
                .build();

        User saveUser = userRepository.save(insertUser);

        return saveUser;
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

    public User findByEmailAndPassword(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        return user;
    }

    public List<User> findAllByNoticeMode(boolean noticeMode) {
        List<User> userList = userRepository.findAllByNoticeMode(noticeMode);
        return userList;
    }
}
