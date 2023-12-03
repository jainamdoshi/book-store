package com.rmit.sept.bk_adminservices.services;

import com.rmit.sept.bk_adminservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_adminservices.model.Transaction;
import com.rmit.sept.bk_adminservices.model.TransactionState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction (Transaction newTransaction) {
        try {
            return transactionRepository.save(newTransaction);
        } catch (Exception e) {
            return null;
        }
    }

    public Transaction approvePendingTransaction (Transaction transaction) {
        try {
            transaction.setTransactionState(TransactionState.REFUNDED);
            return transactionRepository.save(transaction);
        } catch (Exception e) {
            return null;
        }
    }

    public Transaction rejectPendingTransaction (Transaction transaction) {
        try {
            transaction.setTransactionState(TransactionState.APPROVED);
            return transactionRepository.save(transaction);
        } catch (Exception e) {
            return null;
        }
    }

    public Transaction requestRefundTransaction (Transaction transaction) {
        try {
            transaction.setTransactionState(TransactionState.PENDING);
            return transactionRepository.save(transaction);
        } catch (Exception e) {
            return null;
        }
    }
}
