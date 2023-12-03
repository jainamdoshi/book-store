package com.rmit.sept.bk_adminservices;

import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;

public class TestUtil {

    public static User getValidAdminUser() {
        User user = new User();
        user.setUsername("admin@gmail.com");
        user.setFullName("test-display");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setPhoneNumber("123456789");
        user.setUserRole(UserRole.ADMIN);
        user.setAddress("melbourne Australia");
        return user;
    }

    public static User getValidPublicUser() {
        User user = new User();
        user.setUsername("public@gmail.com");
        user.setFullName("test-display");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setPhoneNumber("123456789");
        user.setUserRole(UserRole.PUBLIC);
        user.setAddress("melbourne Australia");
        return user;
    }

    public static User getValidPublisherUser() {
        User user = new User();
        user.setUsername("publisher@gmail.com");
        user.setFullName("test-display");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setPhoneNumber("123456789");
        user.setUserRole(UserRole.PUBLISHER);
        user.setAddress("melbourne Australia");
        return user;
    }
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

}
