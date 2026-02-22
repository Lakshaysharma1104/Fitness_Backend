package com.fitness.aiService.Service.Repository;

import com.fitness.aiService.model.Recommendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepo extends MongoRepository<Recommendation,String> {
    Optional<Recommendation> findByActivityId(String activityId);

    List<Recommendation> findByUserId(String userId);
}
