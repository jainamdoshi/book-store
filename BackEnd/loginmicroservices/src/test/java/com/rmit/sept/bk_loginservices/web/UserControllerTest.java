package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.TestUtil;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.DefaultResponseErrorHandler;

import java.io.IOException;
import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    private final String REGISTER_API = "/api/users/register";
    private final String LOGIN_API = "/api/users/login";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @BeforeEach
    public void setup() {
        testRestTemplate.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        testRestTemplate.getRestTemplate().setErrorHandler(new DefaultResponseErrorHandler() {
            public boolean hasError(ClientHttpResponse response) throws IOException {
                HttpStatus statusCode = response.getStatusCode();
                return statusCode.series() == HttpStatus.Series.SERVER_ERROR;
            }
        });
    }

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
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
    public void registerUser_whenPublisherUserIsInvalid_receiveUsernameRequired() {
        User user = TestUtil.createValidPublisherUser();
        user.setUsername(null);
        ResponseEntity<Object> response = postSignup(user, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.get("username")).isEqualTo("username is required");
    }

    @Test
    public void registerUser_whenPublisherUserIsInvalid_receiveFullNameRequired() {
        User user = TestUtil.createValidPublisherUser();
        user.setFullName(null);
        ResponseEntity<Object> response = postSignup(user, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.get("fullName")).isEqualTo("Please enter your full name");
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
    public void registerUser_whenPublisherUserIsInValid_receiveBad() {
        User user = TestUtil.createValidPublisherUser();
        user.setUsername(null);
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void registerUser_whenPublicUserIsInValid_receiveBad() {
        User user = TestUtil.createValidPublicUser();
        user.setUsername(null);
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void registerUser_whenPublisherUserIsInValid_receiveMultipleErrors() {
        User user = new User();
        ResponseEntity<Object> response = postSignup(user, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.size()).isEqualTo(6);
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

    @Test
    public void registerUser_whenPublicUserIsInValid_userNotSavedToDatabase() {
        User user = TestUtil.createValidPublicUser();
        user.setPhoneNumber(null);
        postSignup(user, User.class);
        assertThat(userRepository.count()).isEqualTo(0);
    }

    @Test
    public void registerUser_whenPublisherUserIsInValid_userNotSavedToDatabase() {
        User user = TestUtil.createValidPublisherUser();
        user.setPhoneNumber(null);
        postSignup(user, User.class);
        assertThat(userRepository.count()).isEqualTo(0);
    }

    @Test
    public void registerUser_whenUserAlreadyExists_receiveUsernameAlreadyExists() {
        userRepository.save(TestUtil.createValidPublicUser());
        User user = TestUtil.createValidPublisherUser();
        ResponseEntity<Object> response = postSignup(user, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.get("username")).isEqualTo("Username 'testemail@gmail.com' already exists");
    }

    @Test
    public void loginUser_whenUserDoesNotExists_receiveInvalidUsername() {
        LoginRequest request = TestUtil.createValidLoginRequest();
        ResponseEntity<Object> response = postLogin(request, Object.class);
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertThat(responseBody.get("username")).isEqualTo("Invalid Username");
    }

    @Test
    public void loginUser_whenUserDoesNotExists_receiveInvalidPassword() {
        LoginRequest request = TestUtil.createValidLoginRequest();
        ResponseEntity<Object> response = postLogin(request, Object.class);
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertThat(responseBody.get("password")).isEqualTo("Invalid Password");
    }

    private <T> ResponseEntity<T> postSignup(User request, Class<T> response){
        return testRestTemplate.postForEntity(REGISTER_API, request, response);
    }

    private <T> ResponseEntity<T> postLogin(LoginRequest request, Class<T> response){
        testRestTemplate.getRestTemplate()
                .getInterceptors().add(new BasicAuthenticationInterceptor(request.getUsername(), request.getPassword()));
        return testRestTemplate.postForEntity(LOGIN_API, request, response);
    }

}
