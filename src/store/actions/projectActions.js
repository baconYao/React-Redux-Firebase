// 參數project是由CreateProject.js dispath來的參數，其代表this.state內的所有properties
export const createProject = (project) => {
  // 由於使用了 thunk package，因此可以return function
  //  getFirebase, getFirestore 是由index.js的thunk.withExtraArgument({getFirebase, getFirestore} 傳入
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // we can make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: "CREATE_PROJECT", project});
    }).catch((err) => {
      dispatch({ type: "CREATE_PROJECT_ERROR", err});
    })
  }
};