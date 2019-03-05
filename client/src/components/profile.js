import React from 'react';
import { Collapse, Card, Button, CardTitle} from 'reactstrap';
import Pmessage from './pmessage'

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
    <CardTitle>{this.props.pname}</CardTitle>

    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>T</Button>
    
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