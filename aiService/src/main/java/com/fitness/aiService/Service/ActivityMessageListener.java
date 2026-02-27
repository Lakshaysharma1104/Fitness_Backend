package com.fitness.aiService.Service;

import com.fitness.aiService.Service.Repository.RecommendationRepo;
import com.fitness.aiService.model.Activity;
import com.fitness.aiService.model.Recommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {
    private final ActivityAiService aiService;
    private final RecommendationRepo recommendationRepo;



    @KafkaListener(topics = "${kafka.topic.name}",groupId = "activity-processor-group")
    public void processActivity(Activity activity){
        log.info("received activity for processing: {}",activity.getUserId());
        Recommendation recommendation = aiService.generateRecommendation(activity);
        recommendationRepo.save(recommendation);

    }
}
