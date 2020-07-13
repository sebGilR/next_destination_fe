const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_FAVORITES':
      return [...action.payload];
    default:
      return state;
  };
};

export default favoritesReducer;
