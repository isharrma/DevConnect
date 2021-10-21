import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Col, Row } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Header from "./Components/Layout/Header";
import Landing from "./Pages/Landing";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Landing />
    </Router>
  );
};

export default App;
