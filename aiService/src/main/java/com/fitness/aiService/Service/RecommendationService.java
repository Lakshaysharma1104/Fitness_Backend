package com.fitness.aiService.Service;

import com.fitness.aiService.Service.Repository.RecommendationRepo;
import com.fitness.aiService.model.Recommendation;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepo recommendationRepo;


    public  List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepo.findByUserId(userId);
    }

    public  Recommendation getActivityRecommendations(String activityId) {
        return recommendationRepo.findByActivityId(activityId).orElseThrow(()-> new RuntimeException("NO recommendation found for this activity"+activityId));
    }
}
