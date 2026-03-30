package com.fitness.activityService.Service;

import com.fitness.activityService.DTO.ActivityRequest;
import com.fitness.activityService.DTO.ActivityResponse;
import com.fitness.activityService.Service.Repository.ActivityRepository;

import com.fitness.activityService.model.Activity;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityService {
   private final ActivityRepository activityRepository;
   private final UserValidationService userValidationService;
   private final KafkaTemplate<String,Activity> kafkaTemplate;

   @Value("${kafka.topic.name}")
   private String topicName;



    public  ActivityResponse trackActivity(ActivityRequest request) {
        Boolean isValidateUser = userValidationService.validateUser(request.getUserId());

        if(!isValidateUser){
            throw new RuntimeException("Invalid user"+request.getUserId());

        }
        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();
        Activity savedActivity = activityRepository.save(activity);
        try{
        kafkaTemplate.send(topicName,savedActivity.getUserId(),savedActivity);

        }catch(Exception e){
            log.error("Cannot send request",e);
        }


        return mapToResponse(savedActivity);
    }

    private ActivityResponse mapToResponse(Activity savedActivity) {
        ActivityResponse activityResponse = new ActivityResponse();
        activityResponse.setId(savedActivity.getId());
        activityResponse.setUserId(savedActivity.getUserId());
        activityResponse.setType(savedActivity.getType());
        activityResponse.setDuration(savedActivity.getDuration());
        activityResponse.setStartTime(savedActivity.getStartTime());
        activityResponse.setAdditionalMetrics(savedActivity.getAdditionalMetrics());
        activityResponse.setCaloriesBurned(savedActivity.getCaloriesBurned());
        activityResponse.setCreatedAt(savedActivity.getCreatedAt());
        activityResponse.setUpdatedAt(savedActivity.getUpdatedAt());
        return activityResponse;
    }
    public List<ActivityResponse> getUserActivities(String userId) {
        List<Activity> activities = activityRepository.findByUserId(userId);
        return activities.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ActivityResponse getActivityById(String activityId) {
        return activityRepository.findById(activityId)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + activityId));
    }
}
