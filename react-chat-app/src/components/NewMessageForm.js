import React from "react";
import { API_ROOT, API_HEADERS } from "../config";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: "" });
  };

  handleChange = event => {
    this.setState({
      [event.event.name]: event.event.value
    });
  };

  render() {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default NewMessageForm;
