import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";
import queryString from "query-string";
import "./Chat.css";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://10.0.1.13:3001",
      username: "",
      room: "",
      socket: {},
    };
  }

  // outputMessage to DOM
  outputMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
      <p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
  };

  // add users to DOM
  outputUsers = (users) => {
    const userList = document.querySelector("#users");
    userList.innerHTML = `
      ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const { username, room } = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const socket = socketIOClient(endpoint);
    this.setState({ username, room, socket });
    // Join chatroom
    socket.emit("joinRoom", { username, room });
    // get room and users
    socket.on("roomUsers", ({ room, users }) => {
      this.outputUsers(users);
    });

    socket.on("message", (message) => {
      console.log(message);
      this.outputMessage(message);
      const chatMessages = document.querySelector(".chat-messages");
      // scroll down when we get a new message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  handleMessageSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    this.state.socket.emit("chatMessage", msg);

    // clear chat message input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  };

  render() {
    const { username, room } = this.state;
    return (
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
          <a href="/" className="btn">
            Leave Room
          </a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">{room}</h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <ul id="users">{username}</ul>
          </div>
          <div className="chat-messages"></div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form" onSubmit={this.handleMessageSubmit}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
            />
            <button className="btn">
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
