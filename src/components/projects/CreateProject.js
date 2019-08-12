import React, {Component} from "react";
import { connect } from "react-redux";
import { createProject } from '../../store/actions/projectActions'

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
    
    //  存取mapDispatchToProps定義的createProject，我們將this.state當成參數(因此就是第51行的參數，名為project)
    this.props.createProject(this.state);
  }

  render() {
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

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatch 內的 createProject，即是我們從import進來的function
    // key createProject，我們將可以透過props access 到它
    createProject: (project) => dispatch(createProject(project)) 
  }
}

// 第一個參數是給 mapStateToProps使用，但在這裡沒使用，因此傳null
export default connect(null, mapDispatchToProps)(CreateProject);
