import { GET_ERRORS, USER_PENDING_ERROR, ADD_BOOKS_ERROR, UPDATE_ERROR_STATUS, GET_USER_DELETE_ERRORS, UPDATE_BOOK_STATUS } from "../actions/types";


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // TESTING FLOW
      return action.payload;

    case USER_PENDING_ERROR:
      // TESTING FLOW
      return {
        ...state,
        pending: "This is account is not yet approved!",
      }

    case ADD_BOOKS_ERROR:
      return {
        ...state,
        bookErrors: action.payload
      }
    case UPDATE_ERROR_STATUS:
      return {
        ...state,
        bookErrors: action.payload
      }
    case USER_PENDING_ERROR:
      return {
        ...state,
        pending: action.payload
      }

    case GET_USER_DELETE_ERRORS:
      return {
        message: `${action.payload.username} cannot be deleted`
      }
    case UPDATE_BOOK_STATUS:
      return {
        bookinformationErrors: action.payload
      }
    default:
      return state;
  }
}