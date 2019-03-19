import React from 'react';
import Navbar from "./navbar";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'








export default class Login extends React.Component {
    state = {
        users: [],
        redirect: false
    };

    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
        socket.emit('userS', {username: this.state.username, email: this.state.email, password: this.state.password})
        this.setState({redirect: true})
    };




    render() {
        var  redirect  = this.state.redirect
        console.log(this.state.redirect)
        if (redirect) return <Redirect to={'/'}/>
        return (
            <div>
                <Navbar/>
                <Form style={{margin:100}} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm="8" md={{ size: 4, offset: 4 }} className={"border"}>
                            <h3 style={{marginTop:30}}>Sign up</h3>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text"
                                       name="username"
                                       id="username"
                                       value={this.state.post}
                                       onChange={e => this.setState({ username: e.target.value })}
                                       placeholder="username"/>
                            </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email"
                                   name="email"
                                   id="exampleEmail"
                                   value={this.state.post}
                                   onChange={e => this.setState({ email: e.target.value })}
                                   placeholder="email" />
                        </FormGroup>


                            <FormGroup style={{marginBottom:20}}>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       name="password"
                                       id="password"
                                       value={this.state.post}
                                       onChange={e => this.setState({ password: e.target.value })}
                                       placeholder="password" />
                                <br/>
                                <Button outline color={"primary"}>Sign up</Button>
                            </FormGroup>


                        </Col>

                    </Row>




                </Form>
            </div>
        )
    }
}