// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// Components
import ProfileForm from '../components/ProfileForm';
// Actions
import { putUpdate } from '../actions/employees';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: '',
        loading: false
    }
  }

  handleSubmit = (values) => {
    const { session, dispatch } = this.props
    if(!session.user.admin){
      dispatch(
        putUpdate({email: values.email}, session.user.id)
      )
    } else {
      dispatch(
        putUpdate({email: values.email , legalName: values.legalName, legalRfc: values.legalRfc}, session.user.id)
      )
    }
  };

  render() {
    const { session } = this.props;
    const { loading } = this.state;
    if (!session) return <Redirect to="/"/>;
    const { user } = session;
    return (
      <>
      {
        loading ? (
          <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
       </div>
        ) : (
        <div className="row">
            <div className="col-sm-12">
            <div className="titlebar">
                <h1>Mi Perfil</h1>
                { user.admin ? (
                <Link to="/employees">Mis empleados <i className="fas fa-users" /></Link>
                ) : (
                <Link to={"/employees/" + user.id}>Mi reporte</Link>
                )}
            </div>
                <ProfileForm onSubmit={this.handleSubmit} user={user} initialValues={user}/>
            </div>
        </div>
        )
      }
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  ...state.session
});

export default connect(mapStateToProps)(Login);