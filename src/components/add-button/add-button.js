import React from "react";
import "./add-button.css";
import { Component } from "react";

export default class AddButton extends Component {
  state = {
    label: ""
  };

  onChangeLabel = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addTask(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <form className="d-flex mt-2" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onChangeLabel}
          placeholder="Добавить слово"
                value={this.state.label}
        />
        <button className="btn btn-info send-task ml-2">
          Добавить слово
        </button>
      </form>
    );
  }
}
