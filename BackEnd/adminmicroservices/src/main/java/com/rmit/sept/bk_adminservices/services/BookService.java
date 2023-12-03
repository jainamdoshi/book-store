package com.rmit.sept.bk_adminservices.services;

import com.rmit.sept.bk_adminservices.Repositories.BookRepository;
import com.rmit.sept.bk_adminservices.exceptions.BookNameAlreadyExistsException;
import com.rmit.sept.bk_adminservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
