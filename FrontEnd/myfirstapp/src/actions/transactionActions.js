import axios from "axios";
import { GET_ERRORS, UPDATE_ERROR_STATUS } from "./types";

export const createTransaction = (transaction, bookUpdateRequest, history, selling) => async dispatch => {
    try {
        const res1 = await axios.post("https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/registertransaction", transaction);
        await axios.put(`https://cors-everywhere.herokuapp.com/http://bookmicroservice-env.eba-vvi3x9cs.ap-southeast-2.elasticbeanstalk.com/api/books/update/${transaction.username}/${transaction.isbn}`, bookUpdateRequest);
        if (!selling) {
            history.push(`/book/${transaction.username}/${transaction.isbn}`);
        }
        dispatch({
            type: GET_ERRORS,
            payload: { message: "New book " + res1.data.numOfNewBook + " Old book " + res1.data.numOfOldBook + " have been successfully purchased!! Thanks for placing an order." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getAllTransactions = () => async dispatch => {
    try {
        const res = await axios.get("https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/all");
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
};

export const getLatestTransactionsFirst = (username, isUserAdmin) => async dispatch => {
    try {
        const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/alllatestfirst/${username}/${isUserAdmin}`);
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
};

export const getOldestTransactionsFirst = (username, isUserAdmin) => async dispatch => {
    try {
        const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/alloldestfirst/${username}/${isUserAdmin}`);
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
};

export const getTransactionsFor = (username) => async dispatch => {
    try {
        const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/allonlyuser/${username}`)
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
}

export const approvePendingTransaction = (transaction, history) => async dispatch => {
    try {
        await axios.put("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/approvetransaction", transaction);
        history.push("/");
        history.push("/transactionhistory");
        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.username + "/" + transaction.isbn + " refund request has been successfully approved." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const rejectPendingTransaction = (transaction, history) => async dispatch => {
    try {
        await axios.put("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/rejecttransaction", transaction);
        history.push("/");
        history.push("/transactionhistory");
        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.username + "/" + transaction.isbn + " refund request has been successfully rejected." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const requestRefundTransaction = (transaction, history) => async dispatch => {
    try {
        await axios.put("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/refundrequest", transaction);
        history.push("/");
        history.push("/transactionhistory");
        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.username + "/" + transaction.isbn + " refund request has been successfully made." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getAllSold = (username) => async dispatch => {
    const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/allsold/${username}`)
    try {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
} 

export const getAllBought = (username) => async dispatch => {
    const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/allbought/${username}`)
    try {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
} 