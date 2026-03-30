package com.fitness.UserService.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String keyCloakId;

    @Column(unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private String firstName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.USER;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
