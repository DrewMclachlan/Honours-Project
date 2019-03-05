import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Input, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, } from 'reactstrap';

import Navbar from './navbar.js'
import Message from './message.js'
import Profile from './profile.js'
import '../App.css';
import Nav from "reactstrap/es/Nav";
class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            test: 'drew',
            modal: false,
            user: '',
            profileu:'',
            profilem:'',
            profileu2:'',
            profilem2:'',
            profileu3:'',
            profilem3:'',
            toggleProfile: false,
            hello: false,
            test123: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleProfileD = this.handleProfileD.bind(this);
        this.test = this.test.bind(this);
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
        console.log(data);
        if(this.state.toggleProfile === false)
        {
            this.setState({profileu: data.pname});
            this.setState({profilem: data.result.reverse()});
            this.setState({toggleProfile: true});
        }else if(this.state.hello === false) {
            this.setState({profileu2: data.pname});
            this.setState({profilem2:data.result.reverse()});
            this.setState({hello: true})
        }else if(this.state.test123 === false){
            this.setState({profileu3: data.pname});
            this.setState({profilem3: data.result.reverse()});
            this.setState({toggleProfile: true});
            this.setState({test123:true})
        }
    }

    handleData (data) {
        this.setState({messages: [...data].reverse()});
        if(this.state.toggleProfile === true){
            const socket = this.props.s;
            socket.emit('pname', this.state.profileu);
        }
    }

    search = async e =>{
        e.preventDefault();
        var searchvalue = this.state.searchq;
        const socket = this.props.s;
        socket.emit('search', searchvalue);
    };

    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
        console.log(this.state.user);
        console.log(this.state.content);
        socket.emit('message', {user:this.state.user, content:this.state.content});
        console.log('sent');
    };

    test(){
        console.log('event');
    };


    render() {
        return (
            <div className="App">
                <Navbar/>
                <Form onSubmit={this.search}>
                    <FormGroup>
                        <Input
                            type="text"
                            name="text" id="exampleText"
                            value={this.state.post}
                            onChange={e => this.setState({ searchq: e.target.value })}
                        />
                        <Button
                            type="submit"
                            color="primary">
                            Search
                        </Button>
                    </FormGroup>
                </Form>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Write a Post</Button>

                <div className={"float-right"} style={{width:"30%", marginTop:80, marginRight:100}}>
                    {
                        this.state.toggleProfile &&
                        <Profile pname={this.state.profileu} result={this.state.profilem}/>
                    }
                    {
                        this.state.hello &&
                        <Profile pname={this.state.profileu2} result={this.state.profilem2}/>
                    }
                    {
                        this.state.test123 &&
                        <Profile pname={this.state.profileu3} result={this.state.profilem3}/>
                    }
                </div>
                <div className={"float-right"} style={{width:"40%", marginRight:50}} >
                    {
                        console.log(this.state.messages)
                    }
                    {
                        this.state.messages.map(user =>
                        <Message key={user._id} u={user.op} m={user.content} s={this.props.s}/>
                    )
                    }

                </div>

                <div>
                <br/>

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
