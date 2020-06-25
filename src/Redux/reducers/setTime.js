const setTimeReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SETTIME':
      return state = action.value;
    default:
      return state
  }
};

export default setTimeReducer;
