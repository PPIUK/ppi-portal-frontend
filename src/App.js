import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

import HomeDashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";

const { Header, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header >
          <Navbar />
        </Header>

        <Content>
          <Switch>
            <Route path="/register" children={<RegistrationForm />} />
            <Route path="/login" children={<LoginForm />} />
            <Route path="/" children={<HomeDashboard />} />
          </Switch>
        </Content>

      </Router>
    );
  }
}

export default App;