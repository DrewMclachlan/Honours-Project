import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Input, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, } from 'reactstrap';
import {
    Link,
} from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import Navbar from './navbar.js'
import Message from './message.js'
import Profile from './profile.js'
import '../App.css';
class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            messages: [], test: 'drew', modal: false, user: '', profileu:'',
            profilem:'', profileu2:'', profilem2:'', profileu3:'', profilem3:'',
            toggleProfile: false, hello: false, test123: false, data: ''
        };
        this.toggle = this.toggle.bind(this);
        this.handleProfileD = this.handleProfileD.bind(this);
        this.test = this.test.bind(this);
        this.innit = this.innit.bind(this);
        this.childHandler = this.childHandler.bind(this)
        this.drew = this.drew.bind(this);
    }

    childHandler(dataFromChild) {
        this.setState({
            data: dataFromChild
        },() => this.drew())
        }

        drew() {
            if(this.state.data)
            switch (this.state.data) {
                case this.state.data = this.state.profileu:
                    this.setState({toggleProfile:false})
                    console.log(this.state.toggleProfile)
                    break;
                case this.state.data = this.state.profileu2:
                    this.setState({hello: false})
                    break;
                case this.state.data = this.state.profileu3:
                    this.setState({test123: false})
                    break;
            }

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
        socket.on('getlist', this.innit);
        socket.on('test', this.test);
        socket.on('transfer', this.handleProfileD)
        socket.on('newmsg', this.test);
    }

    innit(msglist){
        this.setState({messages: [...msglist].reverse()});
    }

    test(msg){
        var x = this.state.messages
        x.unshift(msg[0]);
        this.setState({messages: x});
        this.forceUpdate();
        if(this.state.toggleProfile || this.state.hello || this.state.test123 === true){
            console.log('here');
            var op = msg[0].op
            console.log(op);
            //if(msg[0].op === this.state.profileu || this.state.profileu2 || this.state.profileu3){
                switch(op) {
                    case op = this.state.profileu:
                        var t = this.state.profilem;
                        t.unshift(msg[0].content);
                        if(t.length >= 3){
                            t.pop()
                        }
                        this.setState({profilem:t});
                        break;
                    case op = this.state.profileu2:
                        var t2 = this.state.profilem2;
                        t2.unshift(msg[0].content);
                        if(t2.length >= 3){
                            t2.pop()
                        }
                        this.setState({profilem2:t2});
                        break;
                    case op = this.state.profileu3:
                        var t3 = this.state.profilem3;
                        t3.unshift(msg[0].content);
                        if(t3.length >= 3){
                            t3.pop()
                        }
                        this.setState({profilem3:t3});
                        break;
                }
            }
        }


    handleProfileD (data){
       if(this.state.toggleProfile === false)
        {
            this.setState({profileu: data.pname});
            this.setState({profilem: data.result.reverse()});
            this.setState({toggleProfile: true});
        }else if
       (this.state.hello === false) {
           if(data.pname === this.state.profileu){
               alert('profile already open')
           }else {
               this.setState({profileu2: data.pname});
               this.setState({profilem2: data.result.reverse()});
               this.setState({hello: true})
           }
        }else if(this.state.test123 === false){
           if(data.pname === this.state.profileu2){
               alert('profile already open')
           }else {
               this.setState({profileu3: data.pname});
               this.setState({profilem3: data.result.reverse()});
               this.setState({toggleProfile: true});
               this.setState({test123: true})
           }
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
        var time = new Date().toLocaleTimeString().toString();
        socket.emit('message', {user:this.state.user, content:this.state.content, time:time});
    };



    render() {
        return (
            <div className="App">
                <Navbar/>
                <Row>
                    <Col xs="6" sm="4">
                <Form inline onSubmit={this.search}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="text"
                            name="text" id="exampleText"
                            value={this.state.post}
                            onChange={e => this.setState({ searchq: e.target.value })}
                            width={"50%"}
                        />
                    </FormGroup>
                        <Button
                            type="submit"
                            color="primary">
                            Search
                        </Button>

                    </Form>
                    <Button  className="float-left" color="danger" onClick={this.toggle}>{this.props.buttonLabel}Write a Post</Button>
                    <br/>
                    <br/>
                    <Button className="float-left" color="danger" tag={Link} to ="/">Sign out</Button>
                    </Col>

                    <Col xs="6" sm="4">
                        {
                            this.state.messages.map(user =>
                                <Message key={user._id} u={user.op} m={user.content} t={user.time} s={this.props.s}/>
                            )
                        }
                    </Col>

                    <Col xs="6" sm="4">
                    {
                        this.state.toggleProfile &&
                        <Profile action={this.childHandler} pname={this.state.profileu} result={this.state.profilem}/>
                    }
                    <br/>
                    {
                        this.state.hello &&
                        <Profile action={this.childHandler} pname={this.state.profileu2} result={this.state.profilem2}/>
                    }
                    <br/>
                    {
                        this.state.test123 &&
                        <Profile action={this.childHandler} pname={this.state.profileu3} result={this.state.profilem3}/>
                    }
                    </Col>


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



                </Row>
            </div>

        );
    }
}

export default Homepage;
