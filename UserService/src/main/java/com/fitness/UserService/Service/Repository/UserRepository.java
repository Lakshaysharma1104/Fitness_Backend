package com.fitness.UserService.Service.Repository;

import com.fitness.UserService.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    Boolean existsByEmail(String email);

    Boolean existsByKeyCloakId(String userId);

    User findByEmail(@NotBlank(message ="email is required") @Email(message = "invalid email format") String email);
}
