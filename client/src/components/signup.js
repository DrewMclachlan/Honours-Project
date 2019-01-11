import React from 'react';
import Navbar from "./navbar";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom'








export default class Login extends React.Component {
    state = {
        users: [],
        redirect: false
    };

    handleSubmit = async e => {
        console.log(3)
        this.setState({redirect: true})
        console.log(this.state.redirect)
        e.preventDefault();

        const response = await fetch('/users', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password}),
        })


        const body = await response.text();
        this.setState({responseToPost: body })



    }




    render() {
        console.log(2)
        var  redirect  = this.state.redirect
        console.log(redirect)
        console.log(this.state.redirect)
        if (redirect) return <Redirect to={'/home'}/>
        return (
            <div>
                <Navbar/>
                <Form style={{margin:100}} onSubmit={this.handleSubmit}>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text"
                                       name="username"
                                       id="username"
                                       value={this.state.post}
                                       onChange={e => this.setState({ username: e.target.value })}
                                       placeholder="with a placeholder"/>
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email"
                                   name="email"
                                   id="exampleEmail"
                                   value={this.state.post}
                                   onChange={e => this.setState({ email: e.target.value })}
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



                </Form>
            </div>
        )
    }
}