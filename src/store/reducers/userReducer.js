const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER':
    case 'LOG_IN':
      return { ...action.payload };
    case 'LOG_OUT':
      return {};
    default:
      return state;
  };
};

export default userReducer;