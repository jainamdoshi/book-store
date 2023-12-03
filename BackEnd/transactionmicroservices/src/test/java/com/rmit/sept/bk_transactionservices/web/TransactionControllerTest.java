package com.rmit.sept.bk_transactionservices.web;

import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.TestUtil;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import com.rmit.sept.bk_transactionservices.model.TransactionState;
import com.rmit.sept.bk_transactionservices.services.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TransactionControllerTest {

    private final String REGISTER_TRANSACTION_API = "/api/transactions/registertransaction";
    private final String GET_ALL_TRANSACTIONS_API = "/api/transactions/all";
    private final String GET_TRANSACTION_FOR_API = "/api/transactions//allonlyuser/";
    private final String GET_LATEST_TRANSACTION = "/api/transactions/alllatestfirst/";
    private final String GET_OLDEST_TRANSACTION = "/api/transactions/alloldestfirst/";
    private final String GET_TRANSACTION_FOR_SOLD = "/api/transactions/allsold/";
    private final String GET_TRANSACTION_FOR_BOUGHT = "/api/transactions/allbought/";


    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    @BeforeEach
    public void cleanup() {
        transactionRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void registerTransaction_whenInvalidTransaction_receiveBadRequest() {
        Transaction transaction = TestUtil.createValidTransaction();
        transaction.setUsername(null);
        ResponseEntity<Transaction> response = registerTransaction(transaction, Transaction.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void registerTransaction_whenInvalidTransaction_receiveUserNameRequired() {
        Transaction transaction = TestUtil.createValidTransaction();
        transaction.setUsername(null);
        ResponseEntity<Transaction> response = registerTransaction(transaction, Transaction.class);
        assertThat(response.getBody().getUsername()).isEqualTo("username is required");
    }

    @Test
    public void registerTransaction_whenInvalidTransaction_receiveMultipleErrors() {
        Transaction transaction = TestUtil.createValidTransaction();
        transaction.setUsername(null);
        transaction.setBuyerUsername(null);
        transaction.setIsbn(null);
        transaction.setTotalPrice(0f);
        transaction.setNumOfOldBook(-1);
        transaction.setNumOfNewBook(-1);
        ResponseEntity<Object> response = registerTransaction(transaction, Object.class);
        Map<String, String> errors = (Map<String, String>) response.getBody();
        assertThat(errors.size()).isEqualTo(6);
    }

    @Test
    public void registerTransaction_whenValidTransaction_receiveCreated() {
        Transaction transaction = TestUtil.createValidTransaction();
        ResponseEntity<Transaction> response = registerTransaction(transaction, Transaction.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void registerTransaction_whenValidTransaction_shouldBeInDB() {
        Transaction transaction = TestUtil.createValidTransaction();
        ResponseEntity<Transaction> response = registerTransaction(transaction, Transaction.class);
        assertThat(transactionRepository.count()).isEqualTo(1);
    }

    @Test
    public void registerTransaction_whenValidTransaction_transactionStateShouldBeApproved() {
        Transaction transaction = TestUtil.createValidTransaction();
        ResponseEntity<Transaction> response = registerTransaction(transaction, Transaction.class);
        assertThat(response.getBody().getTransactionState()).isEqualTo(TransactionState.APPROVED);
    }

    @Test
    public void registerTransaction_whenValidTransaction_transactionDateIsAdded() {
        Transaction transaction = TestUtil.createValidTransaction();
        ResponseEntity<Transaction> response = registerTransaction(transaction, Transaction.class);
        assertThat(response.getBody().getTransactionDate()).isNotEqualTo(null);
    }

    @Test
    public void getAllTransactions_whenZeroTransactions_receiveZeroTransactions() {
        List<Transaction> transactions = (List<Transaction>) getAllTransactions(Object.class).getBody();
        assertThat(transactions.size()).isEqualTo(0);
    }

    @Test
    public void getAllTransactions_whenOneTransactions_receiveOneTransactions() {
        transactionRepository.save(TestUtil.createValidTransaction());
        List<Transaction> transactions = (List<Transaction>) getAllTransactions(Object.class).getBody();
        assertThat(transactions.size()).isEqualTo(1);
    }

    @Test
    public void getAllTransactions_whenMultipleTransactions_receiveMultipleTransactions() {
        transactionRepository.save(TestUtil.createValidTransaction());
        transactionRepository.save(TestUtil.createValidTransaction());
        transactionRepository.save(TestUtil.createValidTransaction());
        transactionRepository.save(TestUtil.createValidTransaction());
        transactionRepository.save(TestUtil.createValidTransaction());
        List<Transaction> transactions = (List<Transaction>) getAllTransactions(Object.class).getBody();
        assertThat(transactions.size()).isEqualTo(5);
    }

    @Test
    public void getTransactionsFor_whenInvalidUsername_receiveZeroTransactions() {
        Transaction transaction = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction);

        List<Transaction> response = (List<Transaction>) getTransactionsFor(null, Object.class).getBody();
        assertThat(response.size()).isEqualTo(0);
    }

    @Test
    public void getTransactionsFor_whenAUserHasNoTransactions_noTransactionsAreRetrieved() {
        List<Transaction> response = (List<Transaction>) getTransactionsFor(null, Object.class).getBody();
        assertThat(response.size()).isEqualTo(0);
    }

    @Test
    public void getTransactionsFor_whenValidUsernameIsReceivedForOneTransaction_receiveAsManyOneTransaction() {
        Transaction transaction = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction);

        List<Transaction> transactions = (List<Transaction>) getTransactionsFor(transaction.getUsername(), Object.class).getBody();
        assertThat(transactions.size()).isEqualTo(1);
    }

    @Test
    public void getTransactionsFor_whenOneUserHasMultipleTransactions_OnlyTheUsersTransactionsAreRetrieved() {
        Transaction transaction1 = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction1);
        transactionService.saveTransaction(TestUtil.createValidTransaction());
        transactionService.saveTransaction(TestUtil.createValidTransaction());

        // Two transactions for a different user
        transactionService.saveTransaction(TestUtil.createAnotherValidTransaction());
        transactionService.saveTransaction(TestUtil.createAnotherValidTransaction());

        List<Transaction> transactions = (List<Transaction>) getTransactionsFor(transaction1.getUsername(), Object.class).getBody();

        assertThat(transactions.size()).isEqualTo(3);
    }

    @Test
    public void getAllSold_WhenUserHasSoldOneBook_OnlyTransactionOfOneSoldBookWillAppear() {
        Transaction transaction1 = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction1);

        // This transaction is made by a different seller
        transactionService.saveTransaction(TestUtil.createAnotherValidTransaction());

        List<LinkedHashMap<String, String>> transactions = (List<LinkedHashMap<String, String>>) getAllSold(transaction1.getUsername(), Object.class).getBody();

        boolean condition1 = transactions.get(0).get("username").equals("seller@gmail.com");
        boolean condition2 = transactions.size() == 1;

        assertThat(condition1 && condition2).isEqualTo(true);
    }

    @Test
    public void getAllSold_WhenUserHasSoldMultipleBook_TransactionOfMultipleSoldBookWillAppear() {
        Transaction transaction1 = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction1);
        transactionService.saveTransaction(TestUtil.createValidTransaction());
        transactionService.saveTransaction(TestUtil.createValidTransaction());
        transactionService.saveTransaction(TestUtil.createValidTransaction());

        // This transaction is made by a different seller
        transactionService.saveTransaction(TestUtil.createAnotherValidTransaction());

        List<LinkedHashMap<String, String>> transactions = (List<LinkedHashMap<String, String>>) getAllSold(transaction1.getUsername(), Object.class).getBody();

        boolean condition1 = transactions.get(0).get("username").equals("seller@gmail.com");
        boolean condition2 = transactions.get(1).get("username").equals("seller@gmail.com");
        boolean condition3 = transactions.get(2).get("username").equals("seller@gmail.com");
        boolean condition4 = transactions.get(3).get("username").equals("seller@gmail.com");
        boolean condition5 = transactions.size() == 4;

        assertThat(condition1 && condition2 && condition3 && condition4 && condition5).isEqualTo(true);
    }

    @Test
    public void getAllSold_WhenUserHasSoldNoBook_NoTransactionOfSoldBookWillAppear() {
        Transaction transaction1 = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction1);

        List<LinkedHashMap<String, String>> transactions = (List<LinkedHashMap<String, String>>) getAllSold(transaction1.getUsername(), Object.class).getBody();

        // One transaction has been made but not by sellerAnother@gmail.com
        boolean condition1 = !transactions.get(0).get("username").equals("sellerAnother@gmail.com");
        boolean condition2 = transactions.size() == 1;

        assertThat(condition1 && condition2).isEqualTo(true);
    }

@Test
public void getAllBought_WhenUserHasBoughtOneBook_OnlyTransactionOfOneBoughtBookWillAppear() {
    Transaction transaction1 = TestUtil.createValidTransaction();
    transactionService.saveTransaction(transaction1);

    // This transaction is made by a different seller
    transactionService.saveTransaction(TestUtil.createAnotherValidTransaction());

    List<LinkedHashMap<String, String>> transactions = (List<LinkedHashMap<String, String>>) getAllBought(transaction1.getBuyerUsername(), Object.class).getBody();

    boolean condition1 = transactions.get(0).get("buyerUsername").equals("buy@gmail.com");
    boolean condition2 = transactions.size() == 1;

    assertThat(condition1 && condition2).isEqualTo(true);
}

    @Test
    public void getAllBought_WhenUserHasBoughtMultipleBook_TransactionOfMultipleBoughtBookWillAppear() {
        Transaction transaction1 = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction1);
        transactionService.saveTransaction(TestUtil.createValidTransaction());
        transactionService.saveTransaction(TestUtil.createValidTransaction());
        transactionService.saveTransaction(TestUtil.createValidTransaction());

        // This transaction is made by a different seller
        transactionService.saveTransaction(TestUtil.createAnotherValidTransaction());

        List<LinkedHashMap<String, String>> transactions = (List<LinkedHashMap<String, String>>) getAllBought(transaction1.getBuyerUsername(), Object.class).getBody();

        boolean condition1 = transactions.get(0).get("buyerUsername").equals("buy@gmail.com");
        boolean condition2 = transactions.get(1).get("buyerUsername").equals("buy@gmail.com");
        boolean condition3 = transactions.get(2).get("buyerUsername").equals("buy@gmail.com");
        boolean condition4 = transactions.get(3).get("buyerUsername").equals("buy@gmail.com");
        boolean condition5 = transactions.size() == 4;

        assertThat(condition1 && condition2 && condition3 && condition4 && condition5).isEqualTo(true);
    }

    @Test
    public void getAllBought_WhenUserHasBoughtNoBook_NoTransactionOfBoughtBookWillAppear() {
        Transaction transaction1 = TestUtil.createValidTransaction();
        transactionService.saveTransaction(transaction1);

        List<LinkedHashMap<String, String>> transactions = (List<LinkedHashMap<String, String>>) getAllBought(transaction1.getBuyerUsername(), Object.class).getBody();

        // One transaction has been made but not by buyAnother@gmail.com
        boolean condition1 = !transactions.get(0).get("buyerUsername").equals("buyAnother@gmail.com");
        boolean condition2 = transactions.size() == 1;

        assertThat(condition1 && condition2).isEqualTo(true);
    }


    private <T> ResponseEntity<T> registerTransaction(Transaction request, Class<T> response) {
        return testRestTemplate.postForEntity(REGISTER_TRANSACTION_API, request, response);
    }

    private <T> ResponseEntity<T> getAllTransactions(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_TRANSACTIONS_API, response);
    }

    private <T> ResponseEntity<T> getTransactionsFor(String username, Class<T> response) {
        return testRestTemplate.getForEntity(GET_TRANSACTION_FOR_API + username, response);
    }

    private <T> ResponseEntity<T> getLatestTransactionsFirst(String username, boolean isUserAdmin, Class<T> response) {
        return testRestTemplate.getForEntity(GET_LATEST_TRANSACTION + username + "/" + (isUserAdmin ? "true" : "false"), response);
    }

    private <T> ResponseEntity<T> getOldestTransactionsFirst(String username, boolean isUserAdmin, Class<T> response) {
        return testRestTemplate.getForEntity(GET_OLDEST_TRANSACTION + username + "/" + isUserAdmin, response);
    }

    private <T> ResponseEntity<T> getAllSold(String username, Class<T> response) {
        return testRestTemplate.getForEntity(GET_TRANSACTION_FOR_SOLD + username, response);
    }

    private <T> ResponseEntity<T> getAllBought(String username, Class<T> response) {
        return testRestTemplate.getForEntity(GET_TRANSACTION_FOR_BOUGHT + username, response);
    }

}