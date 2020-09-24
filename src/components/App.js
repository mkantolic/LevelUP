 import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar.js'
import SocialNetwork from '../abis/SocialNetwork.json'
import {BrowserRouter as Router } from "react-router-dom";
import Start from './Start';

class App extends Component {


  render() {
    return (
      <Router>
        <Start />

      </Router>
    );
  }
}

export default App;