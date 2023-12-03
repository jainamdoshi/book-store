package com.rmit.sept.bk_transactionservices.security;

public class SecurityConstant {
    public static final String TRANSACTION_URLS = "/api/transactions/**";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 30_000; // 30 seconds
}
