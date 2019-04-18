import React from 'react'
import Card from "reactstrap/es/Card";
import CardText from "reactstrap/es/CardText";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import CardFooter from "reactstrap/es/CardBody";
export default class Message extends React.Component {


    handleClick = function(event){
        const socket = this.props.s;
        var rightnow = new Date()
        console.log("username clicked:" + rightnow.getHours() + ":" + rightnow.getMinutes() + ":" + rightnow.getSeconds() + ":" + rightnow.getMilliseconds())
        socket.emit('profileUsername', event);
   };


    render() {
        return (
            <div>
            <Card style={{margin:10}}>
                <CardHeader className={"text-left"} onClick={() => this.handleClick(this.props.u)} >{this.props.u}</CardHeader>
                <CardBody>
                <CardText className={"text-left"}>{this.props.m}</CardText>
                </CardBody>
                <CardFooter className={"text-muted"}>
                    <div className={"float-left"}>{this.props.tag}</div>
                    <div className={"float-right"} >{this.props.t}</div>
                </CardFooter>
            </Card>
            </div>
        )
    }
}