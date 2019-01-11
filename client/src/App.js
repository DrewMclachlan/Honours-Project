import React, { Component } from 'react';
import {Breadcrumb} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/navbar.js'
import Message from './components/message'
import {Link, Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'

import './App.css';
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class App extends Component {
    render() {
    return (

            <BrowserRouter>
                <div>
                    <Route exact path ="/" component={Login}/>
                    <Route path={"/signup"} component={Signup}/>
                <Route path={"/home"} component={Home}/>
                </div>
            </BrowserRouter>




    );
  }
}

export default App;
