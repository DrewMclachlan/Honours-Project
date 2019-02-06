import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Pmessage from './pmessage'

export default class Profile extends React.Component {
    render(){
return(
<div>
<Card body inverse color="danger">
    <CardTitle>{this.props.pname}</CardTitle>
    {this.props.result.map(result =>
    <Pmessage m={result}/>
   )}
</Card>
</div>
        )
    }
}