package com.fitness.UserService.Service;


import com.fitness.UserService.Dto.RegisterRequest;
import com.fitness.UserService.Dto.UserResponse;
import com.fitness.UserService.Service.Repository.UserRepository;
import com.fitness.UserService.models.User;
import jdk.jshell.spi.ExecutionControl;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException( "Email already in use");
        }
         User user = new User();
         user.setEmail(request.getEmail());
         user.setFirstName(request.getFirstName());
         user.setLastName(request.getLastName());
         user.setPassword(request.getPassword());

         User savedUser = userRepository.save(user);
         UserResponse userResponse = new UserResponse();
         userResponse.setId(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());

        return  userResponse;

    }

    public  UserResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setPassword(user.getPassword());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }
}
