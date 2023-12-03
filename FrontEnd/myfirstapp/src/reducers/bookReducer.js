import { GET_BOOKS, GET_BOOK } from "../actions/types";

const initialState = {
    books: [],
    book: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload
            };

        case GET_BOOK:
            console.log("This is being called: ", state, action.payload)
            return {
                bookInfo: action.payload
            };

        default:
            return state;
    }
}