// Deps
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
// Containers

// Components
import Home from '../components/Home';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    }
  }

  componentDidMount(){
    const { session } =  this.props || this.props.session || this.state;
    this.setState({session});
  }
 
  render() {
    const { session } =  this.props || this.props.session || this.state;
    if (!session) return <Redirect to="/login"/>;
    const { user } = session;
    return (
      <>
        <Sidebar user={ user } />
        <Header user={ user }/>
        <div className="dashboard">
          <div className="container">
            <Switch>
              <Route path="/" component={ () => <Home user={ user }/> }/>
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

export default connect(mapStateToProps)(Dashboard);
