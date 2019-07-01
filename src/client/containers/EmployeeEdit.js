// Deps
import React from 'react';
// Actions

class EmployeeEdit extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  handleForm(e){
      e.preventDefalut();
  }

  canUpdate(){
      const {session} = this.props;
      return session.admin;
  }

  render() {
    const {session} = this.props;
    const {loading} = this.state;
    return (
      <>
        <h1>Mi Perfil</h1>
        <div className="page padded">
          <div className="row">
            <div className="col-sm-12">
            <form onSubmit={ this.handleForm }>
                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="name">
                        Nombre Completo
                        <input
                            disabled
                            id="name"
                            name="name"
                            value={ user.legalName.toUpperCase() }
                            type="text"/>
                        </label>
                    </div>
                    <div className="col-sm-6">
                    <label htmlFor="rfc">
                    RFC
                    <input
                        disabled
                        id="rfc"
                        name="rfc"
                        value={ user.legalRfc.toUpperCase() }
                        type="text"/>
                    </label>
                </div>
                </div>
                <div className="row">
                    <div className="col-sm-6" style={ { position: 'relative' } }>
                        <label htmlFor="email">
                        Correo electrónico
                        <input
                            id="email"
                            name="secondaryEmail"
                            className="inputField"
                            onChange={ this.handleEmailChange }
                            defaultValue={ secondaryEmail || user.secondaryEmail || user.email }
                            type="mail"/>
                        <button
                            type="submit"
                            className="primary inputButton"
                            onClick={ this.handleEmail }
                            disabled={ !this.canUpdate() }>
                            Actualizar
                        </button>
                        </label>
                    </div>
                </div>
            </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeEdit;
