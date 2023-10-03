package com.moodle.backend.config;


import com.moodle.backend.exception.Unauthorized403;
import com.moodle.backend.repository.UserEntityRepository;
import com.moodle.backend.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.security.sasl.AuthenticationException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Autowired
    UserService userService;

    @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
            if ("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
                DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
                Map<String, Object> attributes = principal.getAttributes();
                String email = attributes.getOrDefault("email", "").toString();
                String name = attributes.getOrDefault("name", "").toString();

                userService.findByEmail(email)
                        .ifPresent(user -> {
                            Map<String, Object> attributes1 = new HashMap<>(oAuth2AuthenticationToken.getPrincipal().getAttributes());
                            attributes1.put("sub", user.getId()); // Assuming user.getId() gives the user's unique identifier
                            DefaultOAuth2User newUser = new DefaultOAuth2User(
                                    List.of(new SimpleGrantedAuthority(user.getRole().name())),
                                    attributes1,
                                    "sub" // Use "sub" as the key for the 'id' attribute
                            );
                            Authentication securityAuth = new OAuth2AuthenticationToken(
                                    newUser,
                                    List.of(new SimpleGrantedAuthority(user.getRole().name())),
                                    oAuth2AuthenticationToken.getAuthorizedClientRegistrationId()
                            );
                            SecurityContextHolder.getContext().setAuthentication(securityAuth);
                        });
            }

            this.setAlwaysUseDefaultTargetUrl(true);
            this.setDefaultTargetUrl("http://localhost:5173");
            super.onAuthenticationSuccess(request, response, authentication);
    }
}
