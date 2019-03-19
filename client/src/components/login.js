import React from 'react';
import Navbar from "./navbar";
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {
    Link,
    Redirect
} from 'react-router-dom'





export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            auth: ''

        };
        this.handleData = this.handleData.bind(this)

    }




    componentDidMount() {
        localStorage.clear();
    }

    handleData (data) {
        console.log('here2' + data);
        this.setState({auth: data});
    }


    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
       var uname = this.state.username;
       localStorage.setItem('user', uname);
        socket.emit('userL', {username: this.state.username, password: this.state.password})
        socket.on('auth', this.handleData)
    };


        render() {
        if (this.state.auth === 'auth'){
            return(
               <Redirect to='/home'/>
            )
        }
        return (
            <div>
            <Navbar/>

                <Form style={{margin:100}} onSubmit={this.handleSubmit}>
                    <Row md={{offest: 3}}>
                        <Col sm="8" md={{ size: 4, offset: 4 }} className={"border"}>
                            <h3 style={{marginTop:30}}>Login</h3>
                            <br/>
                            <FormGroup >
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={this.state.post}
                                    onChange={e => this.setState({ username: e.target.value })}
                                    placeholder="username" />
                            </FormGroup>


                            <FormGroup style={{marginBottom:40}}>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" value={this.state.post}
                                       onChange={e => this.setState({ password: e.target.value })}
                                       placeholder="password" />
                                <br/>
                                <Button outline color={"primary"}>Sign in</Button>
                                <Button outline tag={Link} to ="/signup">Sign up</Button>
                            </FormGroup>


                        </Col>
                    </Row>






                </Form>
            </div>
        )
    }
}