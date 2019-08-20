import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const  ProjectDetails = (props) => {
  // 從url route 取得 文章的 id
  const id = props.match.params.id;
  // console.log(props);
  const { my_project, auth } = props;     // my_project 是利用 mapStateToProps function 從 firebase 存到 store(redux)，再map到此component的props內的
  if(!auth.uid) return <Redirect to='/signin' />

  if(my_project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">
              { my_project.title } - { id }
            </span>
            <p>{ my_project.content }</p>
          </div>
          <div className="card-action gret lighten-4 grey-text">
            <div>Posted by { my_project.authorFirstName } { my_project.authorLastName }</div>
            <div>2 nd september, 2am</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const my_project = projects ? projects[id] : null;
  return {
    my_project: my_project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {  collection: 'projects' }
  ])
)(ProjectDetails);
