import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/navbar.js'

import './App.css';

class App extends Component {
    state = { users: [] };

    componentDidMount() {
        fetch('/drew')
            .then(res => res.json())
            .then(users => this.setState(({users})))
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/drew', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: this.state.content}),
        })

    }
    render() {
    return (
      <div className="App">
       <Navbar/>
          <ul>
          {this.state.users.map(user =>
              <li key={user.id}>{user.content}</li>
          )}
              </ul>
          <form onSubmit={this.handleSubmit}>
              <p>
                  <strong>Post to Server:</strong>
              </p>
              <input
                  type="text"
                  value={this.state.post}
                  onChange={e => this.setState({ content: e.target.value })}
              />
              <button type="submit">Submit</button>
          </form>
          <p>{this.state.responseToPost}</p>




      </div>
    );
  }
}

export default App;
