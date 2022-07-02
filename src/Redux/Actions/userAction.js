import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_DELETE_SUCCESS,
  USER_ADD_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_SUCCESS,
} from '../constant/userConstant';

export const usersListAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAILURE, payload: error.message });
  }
};

//add user
export const addUserAction = (user) => async (dispatch) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch({ type: USER_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAILURE, payload: error.message });
  }
};

//delete user

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'DELETE',
      }
    );

    dispatch({ type: USER_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: USER_LIST_FAILURE, payload: error.message });
  }
};

//update user
export const updateUserAction = (id, user) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAILURE, payload: error.message });
  }
};
