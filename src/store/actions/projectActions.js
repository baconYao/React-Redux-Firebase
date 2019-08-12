export const createProject = (project) => {
  // 由於使用了 thunk package，因此可以return function
  return (dispatch, getState) => {
    // we can make async call to database
    
    dispatch({ type: "CREATE_PROJECT", project});
  }
}