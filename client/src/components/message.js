import React from 'react'
import Card from "reactstrap/es/Card";
import CardText from "reactstrap/es/CardText";
import CardTitle from "reactstrap/es/CardTitle";
import CardHeader from "reactstrap/es/CardHeader";
import CardBlock from "reactstrap/es/CardBlock";
import CardBody from "reactstrap/es/CardBody";

export default class Message extends React.Component {
    render() {
        return (
            <div>
            <Card style={{margin:10}}>
                <CardHeader className={"text-left"} >Drew</CardHeader>
                <CardBody>
                <CardText className={"text-left"}>m: {this.props.m}</CardText>
                </CardBody>
            </Card>



            </div>
        )
    }
}