// Deps
import React from 'react';
import { connect } from 'react-redux';

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
      <>
        <h1>Empleados</h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

export default connect(mapStateToProps)(Employees);
