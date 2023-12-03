package com.rmit.sept.bk_adminservices.Repositories;

import com.rmit.sept.bk_adminservices.model.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {
    List<Transaction> findAll(Sort transactionDate);
}
