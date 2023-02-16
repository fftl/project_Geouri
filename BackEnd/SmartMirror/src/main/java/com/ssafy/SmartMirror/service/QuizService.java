package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Quiz;
import com.ssafy.SmartMirror.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class QuizService {

    private QuizRepository quizRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Quiz getOneQuiz(){
        List<Quiz> quizList = quizRepository.findAll();
        Collections.shuffle(quizList);

        if(quizList.isEmpty()) return null;
        else return quizList.get(0);
    }
}
