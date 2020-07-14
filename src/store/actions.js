export const changeDestinations = data => ({
  type: 'CHANGE_DESTINATIONS',
  payload: data,
});

export const changeDestinations = data => ({
  type: 'CHANGE_FAVORITES',
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

export const toggleMenu = () => {
  type: 'TOGGLE_MENU'
}
