import React, { Component } from 'react';
import {Breadcrumb} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar.js'
import Message from './message.js'

import '../App.css';
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class Homepage extends Component {
    state = { users: [],
    test:'drew'
    };

    componentDidMount() {
        fetch('/drew')
            .then(res => res.json())
            .then(users => this.setState(({users})))
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
            .then(users => this.setState(({users})))
    }


    render() {
        return (
            <div className="App">
                <Navbar/>
                <div>{this.state.test}</div>
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
