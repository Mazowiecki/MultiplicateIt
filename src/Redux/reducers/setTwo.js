const setTwoReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SETTWO':
      return state = action.value;
    default:
      return state
  }
};

export default setTwoReducer;
