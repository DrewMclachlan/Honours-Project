import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import './App.css';
import socketIOClient from "socket.io-client";


class App extends Component {



    render() {

        const socket  = socketIOClient('localhost:4000',{
            transports: ['polling']
        });

        return (

            <BrowserRouter>
                <div>
                    <Route exact path ="/"
                           render={() =>
                               <Login s={socket}/>
                           }/>

                    <Route path={"/signup"}
                           render={() =>
                           <Signup s={socket}/>
                           }/>

                <Route
                    path={"/home"}
                    render={() =>
                        <Home s={socket}/>
                    }/>
                </div>

            </BrowserRouter>




    );
  }
}

export default App;
