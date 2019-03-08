import React from 'react';
import { Collapse, Card, Button, CardTitle} from 'reactstrap';
import Pmessage from './pmessage'
import CardImg from "reactstrap/es/CardImg";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render(){
return(
<div>
<Card body inverse color="danger">
    <CardTitle className={"text-left"}><img src={require("../no-profile.png")} height={50} width={50}/>  |  {this.props.pname}
        <Button className={"float-right"} color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', marginTop:'7px'}}>T</Button>
        <Button className={"float-right"} color="primary" onClick={() => this.props.action(this.props.pname)} style={{ marginBottom: '1rem', marginTop:'7px'}}>X</Button>

    </CardTitle>



    <Collapse isOpen={this.state.collapse}>
    {this.props.result.map(result =>
    <Pmessage m={result}/>
   )}
    </Collapse>
</Card>
</div>
        )
    }
}