package com.rmit.sept.bk_adminservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookNameAlreadyExistsException extends RuntimeException {
    public BookNameAlreadyExistsException(String message) {
        super(message);
    }

}
