import React, { Component } from "react";
import "./item-add-form.css";

export default class ItemAddForm extends Component {
  state = {
    label: ``,
  };

  handleLabelChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onItemAdd(this.state.label);
    // evt.target.reset();
    this.setState({ label: `` });
  };

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.handleLabelChange}
          placeholder="What need to be done"
          value={this.state.label}
        />
        <button className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}
