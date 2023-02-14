package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Story;
import com.ssafy.SmartMirror.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class StoryService {

    private StoryRepository storyRepository;

    @Autowired
    public StoryService(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    public Story getStory(){
        List<Story> stories = storyRepository.findAll();
        Collections.shuffle(stories);

        return stories.get(0);
    }
}
