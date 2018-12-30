import React from "react";
import { API_ROOT, API_HEADERS } from "../config";

class NewConversationForm extends React.Component {
  state = {
    title: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: "" });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default NewConversationForm;
