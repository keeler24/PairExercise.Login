import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  user: {},
};

const GOT_USER = 'GOT_USER';

const getLoggedInUser = user => {
  return {
    type: GOT_USER,
    user,
  };
};

export const getMe = () => {
  return dispatch => {
    return axios
      .get('/auth/me')
      .then(response => {
        dispatch(getLoggedInUser(response.data));
      })
      .catch(console.error.bind(console));
  };
};

export const login = formData => {
  return dispatch =>
    axios
      .put('/auth/login', formData)
      .then(resp => {
        dispatch(getLoggedInUser(resp.data));
      })
      .catch(error => console.log(error));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
