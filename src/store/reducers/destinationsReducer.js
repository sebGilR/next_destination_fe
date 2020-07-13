const destinationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_DESTINATIONS':
      return [...action.payload];
    default:
      return state;
  };
};

export default destinationsReducer;