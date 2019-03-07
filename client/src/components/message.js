import React from 'react'
import Card from "reactstrap/es/Card";
import CardText from "reactstrap/es/CardText";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import CardFooter from "reactstrap/es/CardBody";
export default class Message extends React.Component {

   //add: onClick={() => this.handleClick(this.props.u)}
    //back in
    handleClick = function(event){
        const socket = this.props.s;
        socket.emit('pname', event);
   };
    render() {
        return (
            <div>
            <Card style={{margin:10}}>
                <CardHeader className={"text-left"} onClick={() => this.handleClick(this.props.u)} >{this.props.u}</CardHeader>
                <CardBody>
                <CardText className={"text-left"}>m: {this.props.m}</CardText>
                </CardBody>
                <CardFooter className={"text-right"}>time: {this.props.t} </CardFooter>
            </Card>
            </div>
        )
    }
}