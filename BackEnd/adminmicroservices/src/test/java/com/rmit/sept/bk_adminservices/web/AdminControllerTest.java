package com.rmit.sept.bk_adminservices.web;


import com.rmit.sept.bk_adminservices.Repositories.UserRepository;
import com.rmit.sept.bk_adminservices.TestUtil;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AdminControllerTest {

    private final String GET_ALL_NON_PENDING_USERS_API = "/api/admin/allusers";
    private final String GET_ALL_PENDING_USERS_API =  "/api/admin/allpendingusers";
    private final String PUT_APPROVE_PENDING_USER_API = "/api/admin/approveuser";
    private final String DELETE_REJECT_PENDING_USER_API = "/api/admin/rejectuser/";
    private final String PUT_BLOCK_USER_API = "/api/admin/blockuser";
    private final String REGISTER_API = "/api/admin/register";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenZeroUserExists_receiveZeroUsers() {
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenNoPublicPublisherUserExists_receiveZeroUsers() {
        userService.saveUser(TestUtil.getValidAdminUser());
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenOnePublicUserExists_receiveOneUsers() {
        userService.saveUser(TestUtil.getValidPublicUser());
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenOnePendingPublisherUserExists_receiveZeroUsers() {
        userService.saveUser(TestUtil.getValidPublisherUser());
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenOneNonPendingPublisherUserExists_receiveOneUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultiplePublicUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public2@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultiplePendingPublisherUsers_receiveZeroUsers() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultipleNonPendingPublisherUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultipleMixedPendingPublisherUsers_receiveMultipleNonPendingUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(2);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultipleMixedUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenOneAdminUserExists_receiveZeroUsers() {
        userService.saveUser(TestUtil.getValidAdminUser());
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenOnePublicUserExists_receiveZeroUsers() {
        userService.saveUser(TestUtil.getValidPublicUser());
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenOnePendingPublisherUserExists_receiveAllUsers() {
        userService.saveUser(TestUtil.getValidPublisherUser());
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenMultiplePendingPublisherUsers_receiveAllUsers() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenMultipleNonPendingPublisherUsers_receiveZeroUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        user.setPending(false);
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenMultipleMixedUsers_receiveMultiplePublisherUsers() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        userService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        userService.saveUser(user);
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(2);
    }

    @Test
    public void approvePendingUser_whenUserNotPending_receiveBadRequest() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        ResponseEntity<User> response = approveUsers(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void approvePendingUser_whenUserNotPending_shouldNotChangePendingStatus() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        approveUsers(user, User.class);
        User newUser = userService.findByusername(user.getUsername());
        assertThat(newUser.isPending()).isEqualTo(user.isPending());
    }

    @Test
    public void approvePendingUser_whenUserIsAdmin_receiveBadRequest() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        ResponseEntity<User> response = approveUsers(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void approvePendingUser_whenUserIsAdmin_shouldNotChangePendingStatus() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        approveUsers(user, User.class);
        User newUser = userService.findByusername(user.getUsername());
        assertThat(newUser.isPending()).isEqualTo(user.isPending());
    }

    @Test
    public void approvePendingUser_whenUserPending_receiveOk() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        ResponseEntity<User> response = approveUsers(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void approvePendingUser_whenUserPending_shouldChangePendingStatus() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        approveUsers(user, User.class);
        User newUser = userService.findByusername(user.getUsername());
        assertThat(newUser.isPending()).isEqualTo(user.isPending());
    }

    @Test
    public void approvePendingUser_whenUserNotExists_receiveBadRequest() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("testemailX@gmail.com");
        ResponseEntity<User> response = approveUsers(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void rejectPendingUser_whenUserIsAdmin_receiveBadRequest() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        ResponseEntity<String> response = rejectUser(user.getId(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void rejectPendingUser_whenUserIsAdmin_shouldNotRemoveUser() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        rejectUser(user.getId(), String.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void rejectPendingUser_whenUserIsNotPending_receiveBadRequest() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        ResponseEntity<String> response = rejectUser(user.getId(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void rejectPendingUser_whenUserIsNotPending_shouldNotRemoveUser() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        rejectUser(user.getId(), String.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void rejectPendingUser_whenUserIsPending_receiveOK() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        ResponseEntity<String> response = rejectUser(user.getId(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void rejectPendingUser_whenUserIsPending_shouldRemoveUser() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        rejectUser(user.getId(), String.class);
        assertThat(userRepository.count()).isEqualTo(0);
    }

    @Test
    public void rejectPendingUser_whenUserPublicUserIsPending_receiveOK() {
        User user = TestUtil.getValidPublicUser();
        user.setPending(true);
        userService.saveUser(user);
        ResponseEntity<String> response = rejectUser(user.getId(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void rejectPendingUser_whenUserPublicUserIsPending_shouldRemoveUser() {
        User user = TestUtil.getValidPublicUser();
        user.setPending(true);
        userService.saveUser(user);
        rejectUser(user.getId(), String.class);
        assertThat(userRepository.count()).isEqualTo(0);
    }

    @Test
    public void blockUser_whenUserIsAdmin_receiveBadRequest() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        ResponseEntity<User> response = blockUser(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void blockUser_whenUserIsAdmin_userShouldNotBeBlock() {
        User user = TestUtil.getValidAdminUser();
        userService.saveUser(user);
        blockUser(user, User.class);
        assertThat(userRepository.findByUsername(user.getUsername()).isPending()).isEqualTo(user.isPending());
    }

    @Test
    public void blockUser_whenUserIsPublic_receiveOK() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        ResponseEntity<User> response = blockUser(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void blockUser_whenUserIsPublic_userShouldBeBlock() {
        User user = TestUtil.getValidPublicUser();
        userService.saveUser(user);
        blockUser(user, User.class);
        assertThat(userRepository.findByUsername(user.getUsername()).isPending()).isEqualTo(!user.isPending());
    }

    @Test
    public void blockUser_whenUserIsPublisher_receiveOK() {
        User user = TestUtil.getValidPublisherUser();
        userService.saveUser(user);
        ResponseEntity<User> response = blockUser(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void blockUser_whenUserIsPublisher_userShouldBeBlock() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        userService.saveUser(user);
        blockUser(user, User.class);
        assertThat(userRepository.findByUsername(user.getUsername()).isPending()).isEqualTo(!user.isPending());
    }

    @Test
    public void registerUser_whenPublicUserIsValid_receiveCreated() {
        User user = TestUtil.createValidPublicUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void registerUser_whenPublicUserIsValid_receiveUsername() {
        User user = TestUtil.createValidPublicUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getBody().getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    public void registerUser_whenPublicUserIsValid_passwordIsHashed() {
        User user = TestUtil.createValidPublicUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getBody().getPassword()).isNotEqualTo(user.getPassword());
    }

    @Test
    public void registerUser_whenPublicUserIsValid_pendingIsFalse() {
        User user = TestUtil.createValidPublicUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getBody().isPending()).isEqualTo(false);
    }

    @Test
    public void registerUser_whenPublisherUserIsValid_receiveCreated() {
        User user = TestUtil.createValidPublisherUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void registerUser_whenPublisherUserIsValid_pendingIsTrue() {
        User user = TestUtil.createValidPublisherUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getBody().isPending()).isEqualTo(true);
    }

    @Test
    public void registerUser_whenPublisherUserIsInvalid_receiveAbnWithLength7Required() {
        User user = TestUtil.createValidPublisherUser();
        user.setABN(null);
        ResponseEntity<Object> response = postSignup(user, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.get("ABN")).isEqualTo("ABN is required");
    }

    @Test
    public void registerUser_whenPublicUserIsInvalid_receivePasswordShouldMatch() {
        User user = TestUtil.createValidPublisherUser();
        user.setConfirmPassword("12345");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.get("confirmPassword")).isEqualTo("Passwords must match");
    }

    @Test
    public void registerUser_whenPublicUserIsValid_userSavedToDatabase() {
        User user = TestUtil.createValidPublicUser();
        postSignup(user, User.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void registerUser_whenPublisherUserIsValid_userSavedToDatabase() {
        User user = TestUtil.createValidPublisherUser();
        postSignup(user, User.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    private <T> ResponseEntity<T> blockUser(User user, Class<T> response) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setAccessControlRequestMethod(HttpMethod.PUT);
        HttpEntity<User> requestUpdate = new HttpEntity<>(user, headers);
        return testRestTemplate.exchange(PUT_BLOCK_USER_API, HttpMethod.PUT, requestUpdate, response);
    }

    private <T> ResponseEntity<T> rejectUser(Long id, Class<T> response) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setAccessControlRequestMethod(HttpMethod.DELETE);
        HttpEntity<Long> requestUpdate = new HttpEntity<>(headers);
        return testRestTemplate.exchange(DELETE_REJECT_PENDING_USER_API + id, HttpMethod.DELETE, requestUpdate, response);
    }

    private <T> ResponseEntity<T> approveUsers(User user, Class<T> response) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setAccessControlRequestMethod(HttpMethod.PUT);
        HttpEntity<User> requestUpdate = new HttpEntity<>(user, headers);
        return testRestTemplate.exchange(PUT_APPROVE_PENDING_USER_API, HttpMethod.PUT, requestUpdate, response);
    }

    private <T> ResponseEntity<T> allNonAdminNonPendingUsers(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_NON_PENDING_USERS_API, response);
    }

    private <T> ResponseEntity<T> allNonAdminPendingUsers(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_PENDING_USERS_API, response);
    }

    private <T> ResponseEntity<T> postSignup(User request, Class<T> response){
        return testRestTemplate.postForEntity(REGISTER_API, request, response);
    }

}
