package com.fitness.UserService.Controller;

import com.fitness.UserService.Dto.RegisterRequest;
import com.fitness.UserService.Dto.UserResponse;
import com.fitness.UserService.Service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
private UserService userService;

 @GetMapping("/get-user/{userId}")
 public ResponseEntity<UserResponse> getUserProfile(@PathVariable String userId){
    return ResponseEntity.ok(userService.getUserProfile(userId));
 }

  @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
  }
    @GetMapping("/validate/{userId}")
    public ResponseEntity<Boolean> validateUser(@PathVariable String userId){
        return ResponseEntity.ok(userService.existByUserId(userId));
    }

}
