package com.rmit.sept.bk_adminservices.security;

public class SecurityConstant {

    public static final String SIGN_UP_URLS = "/api/admin/**";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 30_000; // 30 seconds
}
