import React, { Component } from 'react';
import AddModule from './AddModule.js'
import fixtures from '../fixture/base.json'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Modules extends Component {
  constructor() {
    super();
    this.state = {
      all:  [],
      currentEdit: -1,
      editTitle: "",
      editContent: ""
    };
  }

  async addModule (title, content) {
    await this.setState ({
      all: this.state.all.concat([{
        title: title,
        content: content
      }])
    });
  }

  async loadFixture () {
    for (var id in fixtures) {
      await this.addModule(fixtures[id].title, fixtures[id].content)
      await sleep(1000)
    }
  }

  deleteModule(e) {
    var id = Number(e.target.id)
    const data = this.state.all;
    this.setState({
      all: [...data.slice(0, id), ...data.slice(id + 1, this.state.all.length)]
    });
  }

  editModule(e) {
    var id = Number(e.target.id)
    const module = this.state.all[id]
    this.setState({currentEdit: id, editTitle: module.title, editContent: module.content})
  }

  cancelEdit(e) {
    this.setState({currentEdit: -1, editTitle: "", editContent: ""})
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
    var id = Number(this.state.currentEdit)
    var module = {}
    module.title = this.state.editTitle
    module.content = this.state.editContent
    this.setState({all: [...this.state.all.slice(0, id), module, ...this.state.all.slice(id + 1, this.state.all.length)],
      currentEdit: -1,
      editTitle: "",
      editContent: ""})
  }

  goUp(e) {
    var id = Number(e.target.id)
    if (id > 0 && this.state.currentEdit === -1) {
      const data = this.state.all;
      this.setState({
        all: [...data.slice(0, id - 1), data[id], data[id - 1], ...data.slice(id + 1, this.state.all.length)]
      });
    }
  }

  goDown(e) {
    var id = Number(e.target.id)
    if (id < this.state.all.length - 1 && this.state.currentEdit === -1) {
      const data = this.state.all;
      this.setState({
        all: [...data.slice(0, id), data[id + 1], data[id], ...data.slice(id + 2, this.state.all.length)]
      });
    }
  }

  render() {
    var mod = this.state.all.map((step, move) => {
      if (move === this.state.currentEdit) {
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
        <button className="button-loadFixture" id="load" onClick={this.loadFixture.bind(this)}>Load test modules (async 1s/module)</button>
        <AddModule callbackFromParent={this.addModule.bind(this)}/>
        {mod}
      </div>
    );
  }
}

export default Modules;
