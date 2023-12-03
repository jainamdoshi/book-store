import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON, GET_USER_DELETE_ERRORS } from "./types";

export const createPerson = (person, history) => async dispatch => {
  try {
    const res = await axios.post("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/register", person);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/all");
    dispatch({
      type: GET_PERSONS,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getUser = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/${id}`);
    dispatch({
      type: GET_PERSON,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const approvePendingUser = (user, history) => async dispatch => {
  try {
    const res = await axios.put("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/approveuser", user);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully approved." }
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const rejectPendingUser = (user, history) => async dispatch => {
  try {
    const res = await axios.delete(`https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/rejectuser/${user.id}`);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully rejected." }
    });
  } catch (err) {
    dispatch({
      type: GET_USER_DELETE_ERRORS,
      payload: user
    });
  }
}

export const blockUser = (user, history) => async dispatch => {
  try {
    const res = await axios.put("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/blockuser", user);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully blocked." }
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const editUser = (user, history) => async dispatch => {
  try {
    console.log(user)
    const res = await axios.post("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/edituser", user);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully edited." }
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}
