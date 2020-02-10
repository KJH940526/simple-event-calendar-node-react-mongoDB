import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import Header from './components/header/Header';
import Alert from './components/alert/Alert';
import { useRoutes } from './routes';
import * as actionCreators from './appStore/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';



class App extends Component {
  constructor(props) {
    super(props);
    this.isAuthenticated = false;
    this.routes = null;
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    let data = localStorage.getItem('userData');
    data = data && JSON.parse(data);
    if (data?.token) {
      this.props.onLogin(data.token, data.userId)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <main className="container-fluid position-relative">
          <Alert />
          {useRoutes(this.props.isAuthenticated)}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps, actionCreators)(App);


