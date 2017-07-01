import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>IT Recruitment test</h2>
        </div>
        <p className="App-intro">
          Task creator as test for recruitment
        </p>
        <Modules/>
      </div>
    );
  }
}

class Modules extends Component {
  constructor() {
    super();
    this.state = {
      all: [{
        title: "Old Language",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at sem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu tortor et quam malesuada porta vitae vel massa."
      },
      {
        title: "Spanish",
        content: "Pepito, la reĝo de la torto!"
      }],
      currentEdit: -1,
      editTitle: "",
      editContent: ""
    };
  }

  addModule(title, content) {
    this.setState ({
      all: this.state.all.concat([{
        title: title,
        content: content
      }])
    });
  }

  deleteModule(e) {
    this.state.all.splice(e.target.id, 1)
    this.forceUpdate()
  }

  editModule(e) {
    const module = this.state.all[e.target.id]
    this.setState({currentEdit: e.target.id, editTitle: module.title, editContent: module.content})
    this.forceUpdate()
  }

  cancelEdit(e) {
    this.setState({currentEdit: -1, editTitle: "", editContent: ""})
    this.forceUpdate()
  }

  handleChange(e) {
    if (e.target.name === "title") {
      this.setState({editTitle: e.target.value});
    }
    else if (e.target.name === "content") {
      this.setState({editContent: e.target.value});
    }
  }

  validateEditModule(e) {
    const module = this.state.all[this.state.currentEdit]
    module.title = this.state.editTitle
    module.content = this.state.editContent
    this.setState({currentEdit: -1, editTitle: "", editContent: ""})
  }

  goUp(e) {
    var id = Number(e.target.id)
    if (id > 0 && this.state.currentEdit == -1) {
      var mod = this.state.all[id]
      this.state.all[id] = this.state.all[id - 1]
      this.state.all[id - 1] = mod
      this.forceUpdate()
    }
  }

  goDown(e) {
    var id = Number(e.target.id)
    if (id < this.state.all.length - 1 && this.state.currentEdit == -1) {
      var mod = this.state.all[id]
      this.state.all[id] = this.state.all[id + 1]
      this.state.all[id + 1] = mod
      this.forceUpdate()
    }
  }

  render() {
    const mod = this.state.all.map((step, move) => {
      if (move == this.state.currentEdit) {
        return (
          <div className="App-module" key={move}>
            <button className="button-deleteModule" id={move} onClick={this.cancelEdit.bind(this)}>cancel</button>
            <button className="button-editModule" id={move} onClick={this.validateEditModule.bind(this)}>validate</button>
            <input name="title" type="text" value={this.state.editTitle} onChange={this.handleChange.bind(this)}/>
            <input name="content" type="text" value={this.state.editContent} onChange={this.handleChange.bind(this)}/>
          </div>
        );
      }
      return (
        <div className="App-module" key={move}>
          <button className="button-upDown" id={move} onClick={this.goUp.bind(this)}>ʌ</button>
          <button className="button-upDown" id={move} onClick={this.goDown.bind(this)}>v</button>
          <button className="button-deleteModule" id={move} onClick={this.deleteModule.bind(this)}>delete</button>
          <button className="button-editModule" id={move} onClick={this.editModule.bind(this)}>edit</button>
          <h3>{step.title}</h3>
          <p>{step.content}</p>
        </div>
      );
    });

    return (
      <div className="App-modules">
        <AddModule callbackFromParent={this.addModule.bind(this)}/>
        {mod}
      </div>
    );
  }
}

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

export default App;
