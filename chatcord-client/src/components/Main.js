import React, { Component } from "react";
import Chat from "./Chat/Chat";
import ChatJoin from "./ChatJoin/ChatJoin";

export default class Main extends Component {
  state = {
    isSubmitted: false,
    username: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
  };

  render() {
    const { isSubmitted } = this.state;
    return (
      <div>
        {isSubmitted ? <Chat /> : <ChatJoin handleSubmit={this.handleSubmit} />}
      </div>
    );
  }
}
