package com.fitness.gateWay;

import com.fitness.gateWay.User.RegisterRequest;
import com.fitness.gateWay.User.UserService;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NullMarked;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.text.ParseException;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeyCloakUserSyncFilter implements WebFilter {

    private final UserService userService;

    @Override
    @NonNull
    @NullMarked
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        String userId = exchange.getRequest().getHeaders().getFirst("X-User-ID");
        RegisterRequest registerRequest = getUserDetails(token);
        if(userId == null){
            userId = registerRequest.getKeyCloakId();
        }

        if(userId != null && token != null){
            String finalUserId = userId;
            return userService.validateUser(userId)
                    .flatMap(exist -> {
                        if(!exist){
                            if(registerRequest != null) {
                                return userService.registerUser(registerRequest).then(Mono.empty());
                            }
                            else{
                                return  Mono.empty();
                            }
                        }else{
                            log.warn("User already exist,Skipping sync");
                            return Mono.empty();
                        }
                    })
                    .then(Mono.defer(() ->{
                        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                .header("X-User-ID", finalUserId)
                                .build();
                        return  chain.filter((exchange.mutate().request(mutatedRequest).build()));

                    }));
        }


        return chain.filter(exchange);
    }

    private RegisterRequest getUserDetails(String token) {
        try{
            String tokenWithoutBearer = token.replace("Bearer ","").trim();
            SignedJWT signedJWT = SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            log.info("SUB: {}", claims.getStringClaim("sub"));
            log.info("EMAIL: {}", claims.getStringClaim("email"));

            RegisterRequest registerRequest  = new RegisterRequest();
            registerRequest.setEmail(claims.getStringClaim("email"));
            registerRequest.setKeyCloakId(claims.getStringClaim("sub"));
            registerRequest.setFirstName(claims.getStringClaim("given_name"));
            registerRequest.setLastName(claims.getStringClaim("family_name"));
            registerRequest.setPassword("dummy@123");

            return registerRequest ;


        } catch (ParseException e) {
            log.error("couldn't get user detail {}",e.getMessage());
            return null;
        }
    }
}
