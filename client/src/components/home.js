import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Label, Input, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Navbar from './navbar.js'
import Message from './message.js'
import '../App.css';
class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            test: 'drew',
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleData = this.handleData.bind(this)
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
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


                <div>
                <br/>
                    <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Write a Post</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Write a Message!</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="text" id="exampleText"
                                    value={this.state.post}
                                    onChange={e => this.setState({ content: e.target.value })}
                                />
                            </FormGroup>
                                <Button
                                    type="submit"
                                    color="primary"
                                    onClick={this.toggle}>
                                    Do Something
                                </Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>




            </div>
        );
    }
}

export default Homepage;
