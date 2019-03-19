import React from 'react'
import Card from "reactstrap/es/Card";
import CardText from "reactstrap/es/CardText";
import CardBody from "reactstrap/es/CardBody";

export default class Pmessage extends React.Component {
    render() {
        return (
            <div>
                <Card style={{margin:10}}>
                    <CardBody>
                        <CardText style={{color: "black"}} className={"text-left"}>{this.props.m}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}