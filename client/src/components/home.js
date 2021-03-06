import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Input, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ButtonGroup } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import Navbar from './navbar.js'
import Message from './message.js'
import Profile from './profile.js'
import '../App.css';
class Homepage extends Component {
    constructor() {
        super();
        //Initialise state variables
        this.state = {
            messages: [], test: 'closeprofile', modal: false, user: '', profileu:'',
            profilem:'', profileu2:'', profilem2:'', profileu3:'', profilem3:'',
            toggleProfile: false, hello: false, test123: false, data: '', tag: '', closetagged:false, buffer:null,
            title: "Home"
    };

        //Setting the fucntions
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleProfileD = this.handleProfileD.bind(this);
        this.handlenewmessage = this.handlenewmessage.bind(this);
        this.innit = this.innit.bind(this);
        this.childHandler = this.childHandler.bind(this);
        this.closeprofile = this.closeprofile.bind(this);
        this.taggedmsgs = this.taggedmsgs.bind(this);
        this.returnHome = this.returnHome.bind(this);
        this.profilecheck = this.profilecheck.bind(this);
        this.getTagged = this.getTagged.bind(this);
    }

    //Clall back function for closing user profilees
    childHandler(dataFromChild) {
        this.setState({
            data: dataFromChild
        },() => this.closeprofile())
        }
        closeprofile() {
            if(this.state.data)
            switch (this.state.data) {
                case this.state.data = this.state.profileu:
                    this.setState({toggleProfile:false});
                    console.log(this.state.toggleProfile);
                    break;
                case this.state.data = this.state.profileu2:
                    this.setState({hello: false});
                    break;
                case this.state.data = this.state.profileu3:
                    this.setState({test123: false});
                    break;
            }

        }
    //function to toggle dialog box
    toggle(){
        this.setState({
            modal: !this.state.modal,

        });
    }


    //called when the component first mounts and sets socket listners an well as sets the state to the user logged in
    componentDidMount() {

        this.setState({user: localStorage.getItem('user')});

        const socket = this.props.s;
        socket.emit('send', 'handlenewmessage');
        socket.on('getlist', this.innit);

        socket.on('handlenewmessage', this.handlenewmessage);
        socket.on('transfer', this.handleProfileD)



        socket.on('newmsg', this.handlenewmessage);


    }

    //rcalled when filtering through tagged messages
    getTagged(tag){
        var temp = [];
       this.state.messages.forEach(function(m){
           if(m.tag === tag){
               temp.unshift(m);
           }
       });
        this.taggedmsgs(temp);
    }

    //sets new tagged messaged array to the in the state to be displayed
    taggedmsgs(tm){
      if(Object.keys(tm).length > 0) {
            this.setState({title: tm[0].tag, messages: [...tm].reverse(),
                closetagged: true})
        }

    }

//called when the message list is first sent to the client
    innit(msglist){
        console.log("sample size: "+ msglist.length);
        this.setState({messages: [...msglist].reverse()});
    }

    //called when new message is srecived
    handlenewmessage(msg) {
        if (this.state.closetagged === true) {
            if (msg.tag === this.state.searchqt) {
                this.setState(function (currentState){
                    return {
                        messages: [msg].concat(currentState.messages)
                    }
                });
                this.profilecheck(msg);
                return 0;
            } else {
                this.profilecheck(msg);
                return 0;
            }
        }

        this.setState(function (currentState){
            return {
                messages: [msg].concat(currentState.messages)

            }
        });

        this.profilecheck(msg);

    }

    //Profile check
    profilecheck(msg){
        if(this.state.toggleProfile || this.state.hello || this.state.test123 === true){
            var op = msg.op;
                switch(op) {
                    case op = this.state.profileu:
                        var t = this.state.profilem;
                        t.unshift(msg.content);
                        if(t.length > 3){
                            t.pop()
                        }
                        this.setState({profilem:t});
                        break;
                    case op = this.state.profileu2:
                        var t2 = this.state.profilem2;
                        t2.unshift(msg.content);
                        if(t2.length > 3){
                            t2.pop()
                        }
                        this.setState({profilem2:t2});
                        break;
                    case op = this.state.profileu3:
                        var t3 = this.state.profilem3;
                        t3.unshift(msg.content);
                        if(t3.length > 3){
                            t3.pop()
                        }
                        this.setState({profilem3:t3});
                        break;
                }
            }
        }




        //Opens Profiles in the correct order.
    handleProfileD (data){
       if(this.state.toggleProfile === false)
        {
            this.setState({profileu: data.pname});
            this.setState({profilem: data.result.reverse()});
            var rightnow = new Date()
            console.log("Profile displayed:" + rightnow.getHours() + ":" + rightnow.getMinutes() + ":" + rightnow.getSeconds() + ":" + rightnow.getMilliseconds())
            this.setState({toggleProfile: true});
        }else if
       (this.state.hello === false) {
           if(data.pname === this.state.profileu){
               alert('profile already open')
           }else {
               this.setState({profileu2: data.pname});
               this.setState({profilem2: data.result.reverse()});
               var rightnow2 = new Date()
               console.log("Profile displayed:" + rightnow2.getHours() + ":" + rightnow2.getMinutes() + ":" + rightnow2.getSeconds() + ":" + rightnow2.getMilliseconds())
               this.setState({hello: true})
           }
        }else if(this.state.test123 === false){
           if(data.pname === this.state.profileu2){
               alert('profile already open')
           }else {
               this.setState({profileu3: data.pname});
               this.setState({profilem3: data.result.reverse()});
               this.setState({toggleProfile: true});
               this.setState({test123: true})
           }
        }
    }

    //handler for search
    search = async e =>{
        e.preventDefault();
        var rightnow = new Date()
       console.log("user searched for profile:" + rightnow.getHours() + ":" + rightnow.getMinutes() + ":" + rightnow.getSeconds() + ":" + rightnow.getMilliseconds())
        var searchvalue = this.state.searchq;
        const socket = this.props.s;
        socket.emit('search', searchvalue);
    };

    //hanlder for tag search
    searchtag = async e =>{
        e.preventDefault();
        var searchvalue = this.state.searchqt;
        var rightnow = new Date();
        console.log("Tag Searched for:" + rightnow.getHours() + ":" + rightnow.getMinutes() + ":" + rightnow.getSeconds() + ":" + rightnow.getMilliseconds())
        this.getTagged(searchvalue);
    };

    //handler for entring post
    handleSubmit = async e => {
        e.preventDefault();
        const socket = this.props.s;
        var rightnow = new Date()
        var time = rightnow.getHours() + ":" + rightnow.getMinutes() + ":" + rightnow.getSeconds() + ":" + rightnow.getMilliseconds();
        socket.emit('newmessage', {op:this.state.user, content:this.state.content, time:time, tag:this.state.tag});
    };


    //selected raidio button
    onRadioBtnClick(rSelected) {
        switch(rSelected){
            case 1:
                this.setState({ tag: 'News'});
                break;
            case 2:
                this.setState({ tag: 'Sport'});
                break;
            case 3:
                this.setState({ tag: 'Tv'});
                break;
        }

    }

    //called when return home is called
  returnHome(){
        this.setState({ closetagged:false})
        const socket = this.props.s;
      socket.emit('send', 'handlenewmessage');

  }



    render() {
        return (
            <div className="App"  >
                <Navbar/>
            <br/>
                <Row>
                    <Col xs="6" sm="4"  >
                        <div style={{border:"2px solid black", backgroundColor: "lightblue", marginLeft:29}}>
                            <h3>Welcome to RTSM </h3>
                            <p>To get started write a post by clicking the button below. If you'd like to follow the
                            posts of a certian users, search for them</p>
                        <Button size={"lg"} block id={"post"}  color="success" onClick={this.toggle}>
                         Write a Post</Button>



                        <br/>
                        <Form style={{display:"flex"}} onSubmit={this.searchtag}>

                                <Input type="text" name="text" id="searchtag" value={this.state.post}
                                       onChange={e => this.setState({ searchqt: e.target.value })}
                                       width={"50%"} placeholder={"filter messages by tag"}/>

                            <Button type="submit" color="primary">
                                Search
                            </Button>
                        </Form>
                            <br/>

                            <br/>
                            {
                                this.state.closetagged &&
                                <Button size={"lg"} block onClick={this.returnHome} outline color="warning">Return Home</Button>
                            }
                        </div>
                    </Col>


                    <Col xs="6" sm="4" >
                        <div style={{border:"2px solid black", backgroundColor: "lightblue"}}><h3 style={{marginLeft:10}} className={"text-left"}>{this.state.title} feed</h3></div>
                        <div style={{border:"2px solid black", backgroundColor: "lightgrey"}}>

                        {
                            this.state.messages.map(user =>
                                <Message key={user.mid} u={user.op} m={user.content} t={user.time} tag={user.tag} s={this.props.s}/>
                            )
                        }
                    </div>
                    </Col>


                    <Col xs="6" sm="4" >
                        <div style={{border:"2px solid black", backgroundColor: "lightblue", marginRight:29 }}><h3 style={{marginLeft:10}} className={"text-left"}>User profiles</h3></div>

                        <Form  style={{display: "flex", marginRight:29 }} onSubmit={this.search}>

                                <Input type="text" name="text"
                                       id="usersearch" value={this.state.post}
                                       onChange={e => this.setState({ searchq: e.target.value })}
                                       placeholder="search for a user"
                                       />

                            <Button  type="submit" color="primary">Search</Button>


                        </Form>

                        <br/>
                        <br/>


                        <div style={{marginRight:27}}>
                    {
                        this.state.toggleProfile &&
                        <Profile action={this.childHandler} pname={this.state.profileu} result={this.state.profilem} />
                    }
                        </div>
                    <br/>
                        <div style={{marginRight:27}}>
                    {
                        this.state.hello &&
                        <Profile action={this.childHandler} pname={this.state.profileu2} result={this.state.profilem2}/>
                    }
                        </div>
                    <br/>
                        <div style={{marginRight:27}}>
                    {
                        this.state.test123 &&
                        <Profile action={this.childHandler} pname={this.state.profileu3} result={this.state.profilem3}/>
                    }
                        </div>
                    </Col>


                <div>
                <br/>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Write a Message!</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input

                                    type="textarea"
                                    name="text" id="hsubmiti"
                                    value={this.state.post}
                                    onChange={e => this.setState({ content: e.target.value })}
                                />
                            </FormGroup>
                                <ButtonGroup>
                                    <Button id={"news"} color="info" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>News</Button>
                                    <Button id={"sport"} color="info" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Sports</Button>
                                    <Button id={"tv"} color="info" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Tv</Button>
                                </ButtonGroup>
                                <ButtonGroup className={"float-right"}>
                                    <Button id={"hsubmit"} type="submit" color="primary" onClick={this.toggle}>Post</Button>{' '}
                                    <Button color="danger" onClick={this.toggle}>Cancel</Button>
                                </ButtonGroup>
                                <span> | {this.state.tag}</span>


                            </Form>
                        </ModalBody>
                    </Modal>
                </div>



                </Row>
            </div>

        );
    }
}

export default Homepage;
