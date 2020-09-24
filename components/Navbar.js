import React, { Component } from 'react';
import {Router, Switch, Route } from "react-router-dom"; 
import {withRouter} from 'react-router-dom';
import './App.js'
import './App.css'

class Navbar extends Component {

  render() {
    return (

      <nav class="user">
        <ul class="nav ">
        <li class="nav-item">
          <a class="nav-link active" href="#">
            <div class="perspective-text">
                <div class="perspective-line">
                  <p></p>
                  <p class="level">Level + </p>
                </div>
                  <div class="perspective-line">
                    <p>Level</p>
                    <p>UP for</p>
                  </div>
                  <div class="perspective-line">
                    <p>UP</p>
                    <p>Greater Self</p>
                  </div>
                </div>
          </a>
        </li>
        </ul>
        <ul class="nav  justify-content-center">
         <li class="nav-item"><a class="nav-link" href="/">All goals</a></li>
         <li class="nav-item"><a class="nav-link" href="/info">My goals</a></li>
         <li class="nav-item"> <p class="account"> {this.props.account} </p></li>
      </ul>
    </nav>      

      
    )
  }
}

export default Navbar;
 
     /* <nav class="navbar navbar-toggleable-sm navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#home">
             <div class="perspective-text">
                <div class="perspective-line">
                  <p></p>
                  <p>Reality</p>
                </div>
                  <div class="perspective-line">
                    <p>Reality</p>
                    <p>Is Only</p>
                  </div>
                  <div class="perspective-line">
                    <p>Is Only</p>
                    <p>A Matter Of</p>
                  </div>
                </div>
          </a>
        </div>
        
        <div class="navbar-nav ">
          <ul class="nav navbar-nav">
            <li class="nav-item"><a class="nav-link" href="/">Main</a></li>
            <li class="nav-item"><a class="nav-link" href="/info">Info</a></li>
            <li class="nav-item"> {this.props.account}</li>
          </ul>
        </div>
      </div>
    </nav> */