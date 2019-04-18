import React from 'react';
import { Collapse, Card, Button, CardTitle} from 'reactstrap';
import Pmessage from './pmessage';

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
<Card body inverse color="info">
    <CardTitle className={"text-left"}><img src={require("../no-profile.png")} alt={"profile img"} height={50} width={50}/>  |  {this.props.pname}'s Profile
        <Button close className={"float-right"} color="primary" onClick={() => this.props.action(this.props.pname)} style={{ marginBottom: '1rem', marginTop:'7px'}}/>
        <Button close className={"float-right"} color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', marginTop:'7px',}}>&ndash;</Button>
    </CardTitle>

    <Collapse isOpen={this.state.collapse}>
    {this.props.result.map(result =>
    <Pmessage key={Math.floor((Math.random() * 100000))} m={result}/>
   )}
    </Collapse>
</Card>
</div>
        )
    }
}