package com.fitness.activityService.Controller;

import com.fitness.activityService.DTO.ActivityRequest;
import com.fitness.activityService.DTO.ActivityResponse;
import com.fitness.activityService.Service.ActivityService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {
    private final ActivityService activityService;

    @PostMapping("/save")
    public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest activity , @RequestHeader("X-User-ID") String userId) {
        if (userId != null) {
            activity.setUserId(userId);
        }
        return ResponseEntity.ok(activityService.trackActivity(activity));
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getUserActivities(@RequestHeader("X-User-ID") String userId){
        return ResponseEntity.ok(activityService.getUserActivities(userId));
    }


    @GetMapping("/{activityId}")
    public ResponseEntity<ActivityResponse> getActivity(@PathVariable String activityId){
        return ResponseEntity.ok(activityService.getActivityById(activityId));
    }

}
