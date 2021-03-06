import React, {Component} from "react";
import { connect } from "react-redux";
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
  state = {
    title: "",
    content: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmmit = (e) => {
    e.preventDefault();
    // console.log(this.state)
    
    // 存取mapDispatchToProps定義的createProject，我們將this.state當成參數(因此就是第51行的參數，名為project)
    this.props.createProject(this.state);
    // redirct to home page
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="container">
        <form onSubmit={this.handleSubmmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea"  onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatch 內的 createProject，即是我們從import進來的function
    // key createProject，我們將可以透過props access 到它。在此的參數project，即是this.state，並且將它傳入dispatch(createProject(project)內(將由projectActions.js接收)
    createProject: (project) => dispatch(createProject(project)) 
  }
}

// 第一個參數是給 mapStateToProps使用，第二個是mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
