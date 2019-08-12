import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { tsPropertySignature } from "@babel/types";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    // console.log(this.props)
    const { projects } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            {/* 將redux給予的props.projects取出後，再當成參數傳給ProjectList */}
            <ProjectList projects={projects}/>      
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

// 將redux內的state轉換成props，以供此 class component 使用
const mapStateToProps = (state) => {
  return {
    // state.project的project是在rootReducer.js定義的
    // state.project.projects的projects是在projectReducer.js的initState給予得值
    // 我們在這裡定義的projects key，將可以透過 this.tsPropertySignature.projects取得
    projects: state.project.projects
  }
}

// connect是react和redux的黏合劑，需要帶入mapStateToProps，使得Dashboard component知道redux給予它什麼props(在這裡是projects，我們定義的key)
export default connect(mapStateToProps)(Dashboard);