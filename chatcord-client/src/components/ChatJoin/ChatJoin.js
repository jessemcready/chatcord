import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../Chat/Chat.css";

class ChatJoin extends Component {
  state = {
    username: "",
    room: "JavaScript",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, room } = this.state;
    this.props.history.push({
      pathname: "/chat",
      search: `?username=${username}&room=${room}`,
    });
  };

  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
        </header>
        <main className="join-main">
          <form onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeolder="Enter username..."
                value={this.state.username}
                onChange={this.handleUsername}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="room">Room</label>
              <select name="room" id="room">
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="PHP">PHP</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Join Chat
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default withRouter(ChatJoin);
