import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    // console.log(this.props)
    const { projects, auth, notifications } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            {/* 將redux給予的props.projects取出後，再當成參數傳給ProjectList */}
            <ProjectList projects={projects}/>      
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }
}

// 將redux內的state轉換成props，以供此 class component 使用
const mapStateToProps = (state) => {
  console.log(state)
  return {
    // state.project的project是在rootReducer.js定義的
    // state.project.projects的projects是在projectReducer.js的initState給予得值
    // 我們在這裡定義的projects key，將可以透過 this.tsPropertySignature.projects取得
    
    // projects: state.project.projects
    projects: state.firestore.ordered.projects,     // 原本是利用上面的state.project.projects 取得 dummy data，現在改成從firestore存取real data
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

// compose將component變成higher order component，在此是將connect和firestoreConnect變成Dashboard的higher order component
// connect是react和redux的黏合劑，需要帶入mapStateToProps，使得Dashboard component知道redux給予它什麼props(在這裡是projects，我們定義的key)
// firestoreConnect用來和fiestore做data sync，類似一個listener，隨時監聽firestire的變動，它會導致firestoreReducer去和firestore database去做資料的sync，由於資料會存在store內(因我們在rootReducer有定義firestoreReducer)，因此可以透過props去存去資料(流程是，先在這裡將data取出，存進redux store，再透過mapStateToProps轉換成props以供存取)。利用一個list來定義要存取哪些collection(在此為 projects collection & notifications collection)。 
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
  ])
)(Dashboard);
