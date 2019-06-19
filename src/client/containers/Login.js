import React from 'react';

class Login extends React.Component {
  state = {
    loading: false,
    email: 'luis.garcialuna@outlook.com',
    password: 'password',
    message: ''
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { history, location } = this.props;
    event.preventDefault();
  };

  canContinue = () => {
    //
  };

  render() {
    const { message, email, password, loading } = this.state;
    return (
      <>
        <div className="container">
          <img
            alt="Graph"
            className="auth-bird"/>
          <style>{ 'body { background-color: #2B2B2B }' }</style>
          <img
            className="auth-logo"
            alt="Logo"
            style={ { maxWidth: 320, marginBottom: 30 } }/>
          <div className="row">
            <div className="col-xs-12">
              <div className="wrapper-auth">
                <div className="page">
                  { message ? (
                    <div className="alert alert-danger">
                      { message }
                    </div>
                  ) : null }
                  <form onSubmit={ this.handleSubmit }>
                    <input
                      name="email"
                      type="text"
                      onChange={ this.onInputChange }
                      value={ email }
                      placeholder="Correo electrónico"/>
                    <input
                      name="password"
                      type="password"
                      onChange={ this.onInputChange }
                      value={ password }
                      placeholder="Contraseña"/>
                    <button
                      disabled={ !this.canContinue() }
                      type="submit"
                      className="primary block">
                      Continuar
                    </button>
                    <br/>
                    { loading ? (
                      <img
                        alt="loader"/>
                    ) : false }
                  </form>
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
}

export default Login;