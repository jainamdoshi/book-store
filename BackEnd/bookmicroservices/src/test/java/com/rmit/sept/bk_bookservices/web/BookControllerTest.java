package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.TestUtil;
import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.BookId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class BookControllerTest {

    private final String REGISTER_BOOK_API = "/api/books/registerBook";
    private final String GET_ALL_BOOKS_API = "/api/books/allbooks";
    private final String GET_BOOKS_API = "/api/books/";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private BookRepository bookRepository;

    @BeforeEach
    public void cleanup() {
        bookRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void registerBook_whenInvalidBook_receiveBadRequest() {
        Book book = TestUtil.createValidBook();
        book.setNumOfOldBook(0);
        book.setNumOfNewBook(0);
        ResponseEntity<Object> response = registerBook(book, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void registerBook_whenInvalidBook_shouldNotAddInDB() {
        Book book = TestUtil.createValidBook();
        book.setNumOfOldBook(0);
        book.setNumOfNewBook(0);
        registerBook(book, Object.class);
        assertThat(bookRepository.count()).isEqualTo(0);
    }

    @Test
    public void registerBook_whenValidBook_receiveCreated() {
        Book book = TestUtil.createValidBook();
        ResponseEntity<Object> response = registerBook(book, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void registerBook_whenValidBook_shouldAddInDB() {
        Book book = TestUtil.createValidBook();
        registerBook(book, Object.class);
        assertThat(bookRepository.count()).isEqualTo(1);
    }

    @Test
    public void registerBook_whenBookExistsAndSameUser_receiveBadRequest() {
        Book book = TestUtil.createValidBook();
        bookRepository.save(book);
        ResponseEntity<Object> response = registerBook(book, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void registerBook_whenBookExistsAndSameUser_shouldNotAddInDB() {
        Book book = TestUtil.createValidBook();
        bookRepository.save(book);
        registerBook(book, Object.class);
        assertThat(bookRepository.count()).isEqualTo(1);
    }

    @Test
    public void registerBook_whenBookExistsAndDifferentUser_receiveCreated() {
        Book book = TestUtil.createValidBook();
        bookRepository.save(book);
        book = TestUtil.createValidBook();
        book.setUsername("test2@gmail.com");
        ResponseEntity<Object> response = registerBook(book, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void registerBook_whenBookExistsAndDifferentUser_shouldAddInDB() {
        Book book = TestUtil.createValidBook();
        bookRepository.save(book);
        book = TestUtil.createValidBook();
        book.setUsername("test2@gmail.com");
        registerBook(book, Object.class);
        assertThat(bookRepository.count()).isEqualTo(2);
    }

    @Test
    public void getAllBooks_whenNoBooksExists_receiveZeroBooks() {
        List<Book> books = (List<Book>) getAllBooks(Object.class).getBody();
        assertThat(books.size()).isEqualTo(0);
    }

    @Test
    public void getAllBooks_whenOneBookExists_receiveOneBook() {
        bookRepository.save(TestUtil.createValidBook());
        List<Book> books = (List<Book>) getAllBooks(Object.class).getBody();
        assertThat(books.size()).isEqualTo(1);
    }

    @Test
    public void getBook_whenBookExists_receiveBook() {
        Book book = TestUtil.createValidBook();
        bookRepository.save(book);
        ResponseEntity<Book> response = getBook(book.getId(), Book.class);
        assertThat(response.getBody().getIsbn()).isEqualTo(book.getIsbn());
    }

    @Test
    public void getBook_whenBookDoesNotExists_receiveBadRequest() {
        Book book = TestUtil.createValidBook();
        ResponseEntity<Book> response = getBook(book.getId(), Book.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    private <T> ResponseEntity<T> registerBook(Book request, Class<T> response) {
        return testRestTemplate.postForEntity(REGISTER_BOOK_API, request, response);
    }

    private <T> ResponseEntity<T> getAllBooks(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_BOOKS_API, response);
    }

    private <T> ResponseEntity<T> getBook(BookId id, Class<T> response) {
        return testRestTemplate.getForEntity(GET_BOOKS_API + id.getUsername() + "/" + id.getIsbn(), response);
    }
}
