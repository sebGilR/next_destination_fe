export const changeDestinations = data => ({
  type: 'CHANGE_DESTINATIONS',
  payload: data,
});

export const addDestination = data => ({
  type: 'ADD_DESTINATION',
  payload: data,
});

export const updateDestinations = data => ({
  type: 'UPDATE_DESTINATION',
  payload: data,
  id: data.id,
});

export const removeDestination = data => ({
  type: 'REMOVE_DESTINATION',
  payload: data,
});

export const removeFavorite = data => ({
  type: 'REMOVE_FAVORITE',
  payload: data,
});

export const createUser = data => ({
  type: 'CREATE_USER',
  payload: data
});

export const logIn = data => ({
  type: 'LOG_IN',
  payload: data,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const toggleMenu = () => ({
  type: 'TOGGLE_MENU'
});

export const startLoading = () => ({
  type: 'START_LOADING'
});

export const endLoading = () => ({
  type: 'END_LOADING'
});
