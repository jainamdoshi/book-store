package com.rmit.sept.bk_adminservices.model;

import javax.persistence.Embeddable;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BookId implements Serializable {

    @NotNull(message = "username is required")
    private String username;

    @NotNull(message = "ISBN is required")
    private Long isbn;

    public BookId(Long isbn, String username) {
        this.isbn = isbn;
        this.username = username;
    }

    public BookId() {

    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookId accountId = (BookId) o;
        return isbn.equals(accountId.isbn) &&
                username.equals(accountId.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(isbn, username);
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
