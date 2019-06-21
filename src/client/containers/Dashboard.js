import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// Containers

// Components

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Require session to access
    const { session, location } = this.props;
    if (!session) {
      return (
        <Redirect to={ {
          pathname: '/login',
          state: {
            from: location.pathname
          }
        } }/>
      );
    }
    if (jwt.decode(localStorage.token).exp < Date.now() / 1000) {
      alert('Sesión vencida');
      delete localStorage.session;
      delete localStorage.token;
      return <Redirect to="/login"/>;
    }
    const { user } = session;
    return (
      <>
        {/*<Sidebar user={ user } location={ location }/>*/ }
        {/*<Header user={ session.user }/>*/ }
        <div className="dashboard">
          <div className="container">
            <Switch>
              { /*<Route path="/" component={ () => <Home user={ user }/> }/>*/ }
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
