package com.fitness.UserService.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private UserRole userRole = UserRole.USER;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
