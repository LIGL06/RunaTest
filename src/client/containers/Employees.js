// Deps
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    const { session } =  this.props || this.props.session || this.state;
    this.setState({session});
    const {dispatch} = this.props;
    console.log(dispatch);
    // dispatch(getEmployees(values));
  }

  render() {
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="titlebar">
          <h1>Mis Empleados</h1>
          <Link to="/new">Nuevo +</Link>
        </div>
        {/* TODO */}
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

export default connect(mapStateToProps)(Employees);
