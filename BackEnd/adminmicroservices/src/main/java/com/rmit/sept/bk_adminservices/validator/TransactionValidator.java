package com.rmit.sept.bk_adminservices.validator;

import com.rmit.sept.bk_adminservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_adminservices.model.Transaction;
import com.rmit.sept.bk_adminservices.model.TransactionState;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class TransactionValidator implements Validator {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Transaction.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Transaction transaction = (Transaction) object;

//        Date currentDate = new Date(System.currentTimeMillis());

//        if (transaction.getCreate_At().after(currentDate) && !transaction.getCreate_At().equals(currentDate)) {
//            errors.rejectValue("transactionDate", "Date", "Date must be before the current date");
//        }
    }

    public void validateForApprove(Object object, Errors errors) {
        Transaction transaction = (Transaction) object;

        if (transaction.getTransactionState() != TransactionState.PENDING) {
            errors.rejectValue("Transaction", "state", "must be PENDING");
        }
    }

    public void validateForReject(Object object, Errors errors) {
        Transaction transaction = (Transaction) object;

        if (transaction.getTransactionState() != TransactionState.PENDING) {
            errors.rejectValue("Transaction", "state", "must be PENDING");
        }
    }

    public void validateForRefundRequest(Object object, Errors errors) {
        Transaction transaction = (Transaction) object;

        if (transaction.getTransactionState() != TransactionState.APPROVED) {
            errors.rejectValue("Transaction", "state", "must be APPROVED");
        }
    }
}
