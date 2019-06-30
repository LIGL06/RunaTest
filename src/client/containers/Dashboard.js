// Deps
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
// Containers
import NewEmployee from './NewEmployee';
import Employees from './Employees';
import EmployeePreview from './EmployeePreview';
// Components
import Home from '../components/Home';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){}
 
  render() {    
    const { session } = this.props || this.state;    
    if (!session) return <Redirect to="/login"/>;
    const { user } = session;
    return (
      <>
        <Sidebar user={ user } />
        <Header user={ user }/>
        <div className="dashboard">
          <div className="container">
            <Switch>
              <Route path="/new" component={NewEmployee}/>
              <Route path="/employees/:id" component={EmployeePreview}/>
              <Route path="/employees" component={Employees}/>
              <Route path="/" component={ () => <Home user={ user }/> }/>
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.session
});

export default connect(mapStateToProps)(Dashboard);
