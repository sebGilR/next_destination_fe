export const createUser = () => ({
    type: 'CREATE_USER',
});

export const logIn = data => ({
    type: 'LOG_IN',
    payload: data,
});

export const logOut = () => ({
    type: 'LOG_OUT',
});