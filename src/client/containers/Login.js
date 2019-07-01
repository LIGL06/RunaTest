// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
// Components
import LoginForm from '../components/LoginForm';
// Actions
import { postLogin } from '../actions/session';

class Login extends Component {
  state = {
    message: '',
    loading: false
  };

  changeView = () => {
    const { logginIn } = this.state;
    this.setState({logginIn: !logginIn});
  }

  handleSubmit = (values) => {
    const {dispatch} = this.props;
    dispatch(
      postLogin(values)
    );
  };

  render() {
    const { message, loading } = this.state;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 center-xs">
            <i className="fas fa-history fa-5x"  style={{color:"#C28662", paddingTop: 100}}/>
            <h1 style={{color:"#869197", paddingTop: 10}}>Time control</h1>
              <div className="wrapper-auth">
                <div className="page">
                  { message ? (
                    <div className="alert alert-danger">
                      { message }
                    </div>
                  ) : null }
                  <LoginForm onSubmit={this.handleSubmit}/>
                </div>
                <p className="center">
                </p>
                <a href="https://www.linkedin.com/in/luisgarcialuna/" className="center">
                  LinkedIn
                </a>
                &nbsp;
                <a href="https://github.com/LIGL06" className="center">
                  Github
                </a>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  ...state.session
});

export default connect(mapStateToProps)(Login);