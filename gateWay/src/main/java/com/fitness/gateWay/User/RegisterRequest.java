package com.fitness.gateWay.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message ="email is required")
    @Email(message = "invalid email format")
    private String email;
    private String KeyCloakId;
    @NotBlank(message = "password is required")
    @Size(message = "password must have least 6 letters")
    private String password;
    private String firstName;
    private String lastName;
}
