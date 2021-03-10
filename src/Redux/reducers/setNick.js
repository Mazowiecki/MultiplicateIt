const setNickReducer = (state = '', action) => {
  switch (action.type) {
    case 'SETNICK':
      return state = action.value;
    default:
      return state
  }
};

export default setNickReducer;
