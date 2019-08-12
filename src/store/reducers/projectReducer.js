const initState = {
  projects: [
    {id: 1, title: '123', content: "我很好"},
    {id: 2, title: '456', content: "拉肚子囉"},
    {id: 3, title: '789', content: "別再拉了..."},
  ]
};

const projectReducer = (state=initState, action) => {
  return state;
}

export default projectReducer;