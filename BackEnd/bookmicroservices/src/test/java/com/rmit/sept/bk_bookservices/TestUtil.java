package com.rmit.sept.bk_bookservices;

import com.rmit.sept.bk_bookservices.model.Book;

import java.util.Date;

public class TestUtil {

    public static Book createValidBook() {
        Book book = new Book();
        book.setBookName("testBook");
        book.setAuthor("testAuthor");
        book.setBookCoverURL("testURL");
        book.setCategory("testCategory");
        book.setIsbn(12345678912L);
        book.setNumOfNewBook(10);
        book.setNumOfOldBook(10);
        book.setPage(100);
        book.setNewBookPrice(10.25F);
        book.setOldBookPrice(5.25F);
        book.setReleaseDate(new Date());
        book.setUsername("test@gmail.com");
        return book;
    }
}
