package com.rmit.sept.bk_transactionservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Buyer username is required")
    private String buyerUsername;

    @NotNull(message = "username is required")
    private String username;

    @NotNull(message = "isbn is required")
    private Long isbn;

    @Min(value = 1, message = "Price must be greater than 0")
    private float totalPrice;

    @Min(value = 0, message = "Number of new books must be 0 or greater")
    private int numOfNewBook;

    @Min(value = 0, message = "Number of old books must be 0 or greater")
    private int numOfOldBook;

    private Date transactionDate;

    @Enumerated(EnumType.STRING)
    private TransactionState transactionState;

    public Transaction() {
    }

    public Transaction(Long id, String buyerUsername, String username, Long isbn, float totalPrice, int numOfNewBook, int numOfOldBook, Date transactionDate) {
        this.id = id;
        this.buyerUsername = buyerUsername;
        this.username = username;
        this.isbn = isbn;
        this.totalPrice = totalPrice;
        this.numOfNewBook = numOfNewBook;
        this.numOfOldBook = numOfOldBook;
        this.transactionDate = transactionDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getNumOfNewBook() {
        return numOfNewBook;
    }

    public void setNumOfNewBook(int numOfNewBook) {
        this.numOfNewBook = numOfNewBook;
    }

    public String getBuyerUsername() {
        return buyerUsername;
    }

    public void setBuyerUsername(String buyerUsername) {
        this.buyerUsername = buyerUsername;
    }

    public int getNumOfOldBook() {
        return numOfOldBook;
    }

    public void setNumOfOldBook(int numOfOldBook) {
        this.numOfOldBook = numOfOldBook;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public TransactionState getTransactionState() {
        return transactionState;
    }

    public void setTransactionState(TransactionState transactionState) {
        this.transactionState = transactionState;
    }
}
