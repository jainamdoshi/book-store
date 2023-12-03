package com.rmit.sept.bk_bookservices.Repositories;


import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.BookId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, BookId> {

    List<Book> findAllByBookName(String bookName);
    Book getById(BookId id);
    List<Book> findAllByAuthor(String author);
    List<Book> findAllByCategory(String category);
    List<Book> findAllById(BookId bookId);
}
