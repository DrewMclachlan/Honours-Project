import React from 'react';
import Navbar from "./navbar";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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

    handleData (data) {
        console.log('here2' + data);
        this.setState({auth: data});
    }


    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
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
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={this.state.post}
                                    onChange={e => this.setState({ username: e.target.value })}
                                    placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       name="password"
                                       id="password"
                                       value={this.state.post}
                                       onChange={e => this.setState({ password: e.target.value })}
                                       placeholder="password placeholder" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button>Sign in</Button>

                        <Link to="/signup">Sign Up</Link>






                </Form>
            </div>
        )
    }
}