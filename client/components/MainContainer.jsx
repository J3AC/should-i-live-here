import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

//Brings in state from the redux store
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  isLogged: state.auth.isLogged,
});

//Creates functions that change state in redux store
const mapDispatchToProps = dispatch => ({
  userLoginFetch: (email, password) => dispatch(actions.userLoginFetch(email, password)),
  userCreateFetch: (name, email, password) => dispatch(actions.userCreateFetch(name, email, password)),
  userLogout: () => dispatch(actions.userLogout()),
});

class MainContainer extends Component {
  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onLogoutSubmit = this.onLogoutSubmit.bind(this);
  }
  
  //Submitting a user
  onRegisterSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    this.props.userCreateFetch(name, email, password);
  }

  onLoginSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    this.props.userLoginFetch(email, password);
  }

  //No functionality for logging out yet 
  onLogoutSubmit(e) {
    e.preventDefault();
    this.props.userLogout();
  }

  render() {
    return (
      <Router>
        <Header onLogoutSubmit={ this.onLogoutSubmit } isLogged={ this.props.isLogged }/>
        <Route exact path="/" component={SearchContainer} />
        <Route exact path="/results" component={SearchContainer} />
        <Route exact path="/user/login" render={(props) => <Login onLoginSubmit={ this.onLoginSubmit } isLogged={ this.props.isLogged } /> } />
        <Route exact path="/user/register" render={(props) => <Register onRegisterSubmit={ this.onRegisterSubmit }/> } />
      </Router>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
