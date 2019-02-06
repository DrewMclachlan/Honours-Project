import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Label, Input, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Navbar from './navbar.js'
import Message from './message.js'
import Profile from './profile.js'
import '../App.css';
class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            test: 'drew',
            modal: false,
            user: '',
            profileu:'',
            profilem:'',
            toggleProfile: null,
        };
        this.toggle = this.toggle.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleProfileD = this.handleProfileD.bind(this);

    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.setState({user: localStorage.getItem('user')});
        const socket = this.props.s;
        socket.emit('send', 'test');
        socket.on('getlist', this.handleData)
        socket.on('test', this.handleData)
        socket.on('transfer', this.handleProfileD)
    }

    handleProfileD (data){
       console.log(data.result);
       console.log(data.pname);
       this.setState({profileu: data.pname})
        this.setState({profilem: data.result})
        this.setState({toggleProfile: true})
    }

    handleData (data) {
        this.setState({users: data});
        if(this.state.toggleProfile === true){
            const socket = this.props.s;
            socket.emit('pname', this.state.profileu);

        }
    }


    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
        socket.emit('message', {user:this.state.user, content:this.state.content});
        console.log('sent');
    };





    render() {
       document.getElementsByTagName("div")
        return (
            <div className="App">
                <Navbar/>
                <div className={"float-right"} style={{width:"30%", marginTop:80, marginRight:100}}>

                    {
                        this.state.toggleProfile &&
                        <Profile pname={this.state.profileu} result={this.state.profilem}/>
                    }
                </div>
                <div className={"float-right"} style={{width:"40%", marginRight:50}} >
                    {this.state.users.map(user =>
                        <Message u={user.op} m={user.content} s={this.props.s}/>
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
                                    Post
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
