import React, { Component } from 'react';
import {Breadcrumb} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar.js'
import Message from './message.js'

import '../App.css';
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import socketIOClient from "socket.io-client";

class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            test: 'drew'
        };

        this.handleData = this.handleData.bind(this)
    }
    componentDidMount() {
        const socket = socketIOClient('localhost:4000')
        socket.on('test', this.handleData)


      //  fetch('/drew')
          //  .then(res => res.json())
          //  .then(users => this.setState(({users})))
    }

    handleData (data) {
        console.log('here' + data);
        this.setState({users: data});
    }

    pop(u){
        var x = this.state.users;
        console.log('state', x)
        var count = Object.keys(u).length -1
        console.log(count);

         var msg = u[count]
            x.unshift(msg);
        console.log('pop', x)
       // this.setState(({users: x}))
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state.users)
        const response = await fetch('/drew', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: this.state.content}),
        })
        .then(response => response.json())
            .then(users => {this.pop(users)})
    }


    render() {
        return (
            <div className="App">
                <Navbar/>
                <div className={"float-right"} style={{width:"40%", marginRight:300}} >

                    {this.state.users.map(user =>
                        <Message u={user.op} m={user.content} />
                    )}

                </div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Post to Server:</strong>
                    </p>
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.setState({ content: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>




            </div>
        );
    }
}

export default Homepage;
