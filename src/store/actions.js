export const CHANGE_DESTINATIONS = 'CHANGE_DESTINATIONS';
export const ADD_DESTINATION = 'ADD_DESTINATION';
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION';
export const REMOVE_DESTINATION = 'REMOVE_DESTINATION';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const CREATE_USER = 'CREATE_USER';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const changeDestinations = data => ({
  type: CHANGE_DESTINATIONS,
  payload: data,
});

export const addDestination = data => ({
  type: ADD_DESTINATION,
  payload: data,
});

export const updateDestinations = data => ({
  type: UPDATE_DESTINATION,
  payload: data,
  id: data.id,
});

export const removeDestination = data => ({
  type: REMOVE_DESTINATION,
  payload: data,
});

export const removeFavorite = data => ({
  type: REMOVE_FAVORITE,
  payload: data,
});

export const createUser = data => ({
  type: CREATE_USER,
  payload: data,
});

export const logIn = data => ({
  type: LOG_IN,
  payload: data,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});
