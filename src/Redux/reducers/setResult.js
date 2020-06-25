const setResultReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SETRESULT':
      return state = action.value;
    default:
      return state
  }
};

export default setResultReducer;
