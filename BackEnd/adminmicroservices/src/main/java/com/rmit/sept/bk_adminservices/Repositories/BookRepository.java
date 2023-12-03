package com.rmit.sept.bk_adminservices.Repositories;


import com.rmit.sept.bk_adminservices.model.Book;
import com.rmit.sept.bk_adminservices.model.BookId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, BookId> {

    Book getById(BookId id);
    List<Book> findAllByAuthor(String author);
    List<Book> findAllByCategory(String category);
}
