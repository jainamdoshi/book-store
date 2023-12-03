package com.rmit.sept.bk_bookservices.payload;

import javax.validation.constraints.NotBlank;

public class BookUpdateRequest {
    @NotBlank(message = "Username cannot be blank")
    private int numOfNewBook;
    @NotBlank(message = "Password cannot be blank")
    private int numOfOldBook;

    public int getNumOfNewBook() {
        return numOfNewBook;
    }

    public void setNumOfNewBook(int numOfNewBook) {
        this.numOfNewBook = numOfNewBook;
    }

    public int getNumOfOldBook() {
        return numOfOldBook;
    }

    public void setNumOfOldBook(int numOfOldBook) {
        this.numOfOldBook = numOfOldBook;
    }
}
