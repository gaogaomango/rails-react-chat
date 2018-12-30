import React from "react";
import { ActionCable } from "react-actioncable-provider";
import Cable from "./Cable";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import { API_ROOT } from "../config";

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.message = [...conversation.messages, message];
    this.setState({ conversations });
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  render() {
    const { conversations, activeConversation } = this.state;

    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm />
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default ConversationsList;

const mapConversations = (conversations, handleClick) => {
  return (
    conversations.length > 0 &&
    conversations.map(conversation => {
      return (
        <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
          {conversation.title}
        </li>
      );
    })
  );
};

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};
