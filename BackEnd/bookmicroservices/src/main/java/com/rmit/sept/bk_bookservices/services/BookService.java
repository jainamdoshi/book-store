package com.rmit.sept.bk_bookservices.services;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook (Book newBook){
        try{
            return bookRepository.save(newBook);

        }catch (Exception e){
            return null;
        }
    }

    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<Book>();
        bookRepository.findAll().forEach(books::add);
        return books;
    }

    public List<Book> findBybookname(String bookname) {
        List<Book> searchedBooks = new ArrayList<Book>();
        for(Book book : bookRepository.findAll()) {
            if(book.getBookName().toLowerCase().contains(bookname)) {
                searchedBooks.add(book);
            }
        }
        return searchedBooks;
    }


    public List<Book> findAllByauthor(String author) {
        List<Book> searchedBooks = new ArrayList<Book>();
        for(Book book : bookRepository.findAll()) {
            if(book.getAuthor().toLowerCase().contains(author)) {
                searchedBooks.add(book);
            }
        }
        return searchedBooks;
    }

    public List<Book> findAllBycategory(String category) {
        List<Book> searchedBooks = new ArrayList<Book>();
        for(Book book : bookRepository.findAll()) {
            if(book.getCategory().toLowerCase().contains(category)) {
                searchedBooks.add(book);
            }
        }
        return searchedBooks;
    }

    public List<Book> findAllByisbn(String isbn) {
        List<Book> searchedBooks = new ArrayList<Book>();
        for(Book book : bookRepository.findAll()) {
            if(String.valueOf(book.getIsbn()).equals(isbn)) {
                searchedBooks.add(book);
            }
        }
        return searchedBooks;
    }
}
