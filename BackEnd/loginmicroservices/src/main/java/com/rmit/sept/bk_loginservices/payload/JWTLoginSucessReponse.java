package com.rmit.sept.bk_loginservices.payload;

// This class return when there is a successful login
// It will be sent to the front-end with a success, token and whether the user is pending or not

public class JWTLoginSucessReponse {
    private boolean success;
    private String token;
    private boolean pending;

    public JWTLoginSucessReponse(boolean success, String token, boolean pending) {
        this.success = success;
        this.token = token;
        this.pending = pending;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isPending() {
        return pending;
    }
    public void setPending() {
        this.pending = pending;
    }


    @Override
    public String toString() {
        return "JWTLoginSuccessResponse{" +
                "pending=" + pending +
                ", success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}