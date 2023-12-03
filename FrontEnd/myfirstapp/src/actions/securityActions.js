import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_PENDING_ERROR } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
    let defaultPostURL = "https://cors-everywhere.herokuapp.com/http://loginmicroservice-env.eba-dtaapp8i.ap-southeast-2.elasticbeanstalk.com/api/users/register";
    let isAdmin = false;
    const token1 = localStorage.getItem("jwtToken");

    if (token1) {
        const decoded_tok = jwt_decode(token1)

        if (decoded_tok.userRole == "ADMIN") {
            defaultPostURL = "https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/register";
            isAdmin = true;
        }
    }

    try {
        // A request will be made to the below URl with the user info to store in DB.
        await axios.post(defaultPostURL, newUser);
        if (isAdmin) {
            history.push("/admin");
            // A success message alert will be dispatched to the admin page
            dispatch({
                type: GET_ERRORS,
                payload: { message: newUser.username + " has been successfully made." }
            });
        }
        else {
            history.push("/login");
            // A success message alert will be dispatched to the signup page
            dispatch({
                type: GET_ERRORS,
                payload: { message: "Congratulations!! " + newUser.username + " have successfully Signed Up." }
            });
        }

    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const login = (LoginRequest) => async dispatch => {

    try {
        // These codes are added by Homy below

        // post => Login Request
        const res = await axios.post("https://cors-everywhere.herokuapp.com/https://cors-everywhere.herokuapp.com/http://loginmicroservice-env.eba-dtaapp8i.ap-southeast-2.elasticbeanstalk.com/api/users/login", LoginRequest);
        // extract token from res.data
        const { token, pending } = res.data;

        if (!pending) {
            // store the token in the localStorage
            localStorage.setItem("jwtToken", token);
            // set our token in header ***
            // setJWTToken needs to be coded for token
            setJWTToken(token);
            // decode token on React
            const decoded = jwt_decode(token);
            // dispatch to our securityReducer
            dispatch({
                type: SET_CURRENT_USER,
                payload: decoded
            });
        } else {

            dispatch({
                type: USER_PENDING_ERROR,
                payload: {}
            })

        }

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    // setJWTToken needs to be coded for token
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};