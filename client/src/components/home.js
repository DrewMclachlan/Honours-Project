import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar.js'
import Message from './message.js'
import '../App.css';
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
        const socket = this.props.s;
        socket.emit('send', 'test');
        socket.on('getlist', this.handleData)
        socket.on('test', this.handleData)

    }

    handleData (data) {
        this.setState({users: data});
    }


    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
        socket.emit('message', this.state.content);
        console.log('sent');
    };


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
            </div>
        );
    }
}

export default Homepage;
