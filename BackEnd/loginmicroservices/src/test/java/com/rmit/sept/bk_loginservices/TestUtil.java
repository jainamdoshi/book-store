package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserRole;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;

public class TestUtil {

    public static User createValidPublicUser() {
        User user = new User();
        user.setUsername("testemail@gmail.com");
        user.setFullName("test-display");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setPhoneNumber("123456789");
        user.setUserRole(UserRole.PUBLIC);
        user.setAddress("melbourne Australia");
        return user;
    }

    public static User createValidPublisherUser() {
        User user = new User();
        user.setUsername("testemail@gmail.com");
        user.setFullName("test-display");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setPhoneNumber("123456789");
        user.setUserRole(UserRole.PUBLISHER);
        user.setAddress("melbourne Australia");
        user.setABN("12345678912");
        return user;
    }

    public static LoginRequest createValidLoginRequest() {
        LoginRequest request = new LoginRequest();
        request.setUsername("testemail@gmail.com");
        request.setPassword("123456");
        return request;
    }
}
