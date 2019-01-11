import React from 'react';
import Navbar from "./navbar";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class Login extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Form style={{margin:100}}>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                         </Col>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="password placeholder" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button>Sign in</Button>
                </Form>
            </div>
        )
    }
}