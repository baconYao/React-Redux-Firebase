const initState = {
  // 由於改成存firestore存取real data，因此不再需要dummy data
  // projects: [
  //   {id: 1, title: '123', content: "我很好"},
  //   {id: 2, title: '456', content: "拉肚子囉"},
  //   {id: 3, title: '789', content: "別再拉了..."},
  // ]
};

const projectReducer = (state=initState, action) => {
  // acation的type是我們在action js檔案裡面定義的
  switch(action.type) {
    case 'CREATE_PROJECT':
      // 當action對應到我們的定義定義時(在actions/projectActions.js內)
      console.log('create_project', action.project);
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log("create project error", action.err);
      return state;
    default:
      return state;
  }
}

export default projectReducer;