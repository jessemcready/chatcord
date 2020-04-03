import React from "react";
import ChatJoin from "./components/ChatJoin/ChatJoin";
import Chat from "./components/Chat/Chat";
import { withRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={() => <ChatJoin />} />
        <Route exact path="/chat" component={() => <Chat />} />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
