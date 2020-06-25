const setOneReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SETONE':
      return state = action.value;
    default:
      return state
  }
};

export default setOneReducer;
