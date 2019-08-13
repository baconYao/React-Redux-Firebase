export const createProject = (project) => {
  // 由於使用了 thunk package，因此可以return function
  //  getFirebase, getFirestore 是由index.js的thunk.withExtraArgument({getFirebase, getFirestore} 傳入
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // we can make async call to database
    
    dispatch({ type: "CREATE_PROJECT", project});
  }
}