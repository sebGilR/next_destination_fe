const destinationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_DESTINATIONS':
      return [...action.payload];
    case 'ADD_DESTINATION':
      return [...state, action.payload];
    case 'UPDATE_DESTINATION':
      return [
        ...state.filter(dest => dest.id !== action.id),
        action.payload,
      ];
    case 'REMOVE_DESTINATION':
      return [
        ...state.filter(dest => dest.id !== action.payload),
      ];
    default:
      return state;
  }
};

export default destinationsReducer;
