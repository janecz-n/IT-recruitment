import React, { Component } from 'react';

class AddModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callback: this.props.callbackFromParent,
      show:false,
      title:"",
      content:""
    };
  }

  deployModuleCreator(e) {
    this.setState({ show:(this.state.show ? false : true) });
  }

  handleChange(e) {
    if (e.target.name === "title") {
      this.setState({title: e.target.value});
    }
    else if (e.target.name === "content") {
      this.setState({content: e.target.value});
    }
  }

  createModule(e) {
    e.preventDefault();
    if (this.state.title.length)
      this.props.callbackFromParent(this.state.title, this.state.content);
  }

  render() {
    if (this.state.show) {
      return (
        <div className="App-add_module">
          <button id="button-creator" className="button-hideCreator" onClick={this.deployModuleCreator.bind(this)}>Hide Form</button>
          <form onSubmit={this.createModule.bind(this)}>
            <input name="title" type="text" placeholder="Enter Title" onChange={this.handleChange.bind(this)} />
            <input name="content" type="text" placeholder="Enter Content" onChange={this.handleChange.bind(this)} />
            <input className="button-submit" type="submit" value="Submit"/>
          </form>
        </div>
      );
    }
    return (
      <div className="App-add_module">
        <button id="button-creator" className="button-showCreator" onClick={this.deployModuleCreator.bind(this)}>Show Form</button>
      </div>
    );
  }
}

export default AddModule;
