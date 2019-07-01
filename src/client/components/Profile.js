// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components
import ProfileForm from '../components/ProfileForm';
// Actions


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
    // Update Profile
  };

  render() {
    const { message, loading } = this.state;
    const { user } = this.props;
    return (
      <>
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
                <ProfileForm onSubmit={this.handleSubmit} user={user} initialValues={{legalName: user.legalName}}/>
            </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.session.user
});

export default connect(mapStateToProps)(Login);