import React from 'react';
import Navbar from "./navbar";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    Route,
    Link
} from 'react-router-dom'
import Signup from './signup'
import Home from './home'




export default class Login extends React.Component {
    state = {
        users: [],
        auth: ''

    };

    handleSubmit = async e => {

        e.preventDefault();

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        })

        const body = await response.text();
        console.log(body);
        this.setState({auth: body })

    }
        //change so that instead of rendering, it redirects
        render() {
        if (this.state.auth === 'home'){
            return(
                <Home/>
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