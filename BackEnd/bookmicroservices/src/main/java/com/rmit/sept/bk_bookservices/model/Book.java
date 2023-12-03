package com.rmit.sept.bk_bookservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Book implements Serializable {

    @NotBlank(message = "Book name is required")
    private String bookName;

    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Release date is required")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date releaseDate;

    @Min(value = 1, message = "Number of Pages must be greater than 0")
    private int page;

    @EmbeddedId
    private BookId id;

    @Column(columnDefinition="TEXT")
    @NotBlank(message = "Book cover URL is required")
    private String bookCoverURL;

    @Min(value = 0, message = "New book's price must be 0 or greater")
    private float newBookPrice;

    @Min(value = 0, message = "Old book's price must be 0 or greater")
    private float oldBookPrice;

    @Min(value = 0, message = "Number of new books must be 0 or greater")
    private int numOfNewBook;

    @Min(value = 0, message = "Number of old books must be 0 or greater")
    private int numOfOldBook;

    private Date create_At;
    private Date update_At;

    public Book(String bookName, String author, String category, Date releaseDate, int page, BookId bookID, String bookCoverURL, int numOfNewBook, int numOfOldBook, float newBookPrice, float oldBookPrice) {
        this.bookName = bookName;
        this.author = author;
        this.category = category;
        this.releaseDate = releaseDate;
        this.page = page;
        this.id = bookID;
        this.bookCoverURL = bookCoverURL;
        this.newBookPrice = newBookPrice;
        this.oldBookPrice = oldBookPrice;
        this.numOfNewBook = numOfNewBook;
        this.numOfOldBook = numOfOldBook;
    }

    public Book() {
        this.id = new BookId();
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }


    public long getIsbn() {
        return this.id.getIsbn();
    }

    public void setIsbn(Long isbn) {
        this.id.setIsbn(isbn);
    }

    public String getUsername() {
        return this.id.getUsername();
    }

    public void setUsername(String username) {
        this.id.setUsername(username);
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getBookCoverURL() {
        return bookCoverURL;
    }

    public void setBookCoverURL(String bookCoverURL) {
        this.bookCoverURL = bookCoverURL;
    }

    public void setId(BookId id) {
        this.id = id;
    }
    public BookId getId() {
        return this.id;
    }

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

    public float getNewBookPrice() {
        return newBookPrice;
    }

    public void setNewBookPrice(float newBookPrice) {
        this.newBookPrice = newBookPrice;
    }

    public float getOldBookPrice() {
        return oldBookPrice;
    }

    public void setOldBookPrice(float oldBookPrice) {
        this.oldBookPrice = oldBookPrice;
    }

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.update_At = new Date();
    }
}