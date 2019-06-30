// Dependencies
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Components

// Actions
import { getEmployee } from '../actions/employees';


class EmployeePreview extends Component {
    static propTypes = {
        getEmployee: PropTypes.func.isRequired
    }

  state = {
    message: '',
    logginIn: true
  };

  componentDidMount(){
    const { match } = this.props;
    this.props.getEmployee(match.params.id).then(()=>{
        console.log(this.props);
    });
  }

  render() {
    const { employees } = this.props;
    return (
      <div className="contract">
      <Link to="/employee" className="back">
        &lt; Regresar a Mis Empleados
      </Link>
      <div className="titlebar">
        <h1>{employees.employee.legalName}</h1>
        <span className="status pending mt-15">Estado de Hoy</span>
      </div>

      <div className="page padded">
        <div className="row">
          <div className="col-sm-7">
            <span>
              Descripción
            </span>
            <p>Algo desc</p>
          </div>
          <div className="col-sm-5">
            <span>
              Último Check-in
            </span>
            <p>Fecha
            </p>
            <br />
            <div className="row">
              <span className="col-lg-12 col-sm-12">Etiquetas</span>
              {/* Colores */}
            </div>
          </div>
        </div>
        <br />

        {/* <div className="row">
          <div className="col-sm-12">
            <span>
              Fechas pasadas
            </span>
            {signers.length ? (
              signers.map(localSigner => (
                <div className="row mtm-10" key={localSigner.legalRfc} style={{ color: '#555' }}>
                  <div className="col-sm-1">
                    <div className="align-center mt-15">
                      {
                        localSigner.signed ? (
                          <i
                            className="fas fa-check-circle"
                            style={{ color: '#7ED321' }} />
                        ) : (
                          <span>&nbsp;&nbsp;&nbsp;</span>
                        )
                      }
                      <span style={{ padding: 10 }}>{localSigner.turn}</span>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <p>{localSigner.legalRfc}</p>
                  </div>
                  <div className="col-sm-4">
                    {mySigners.length && (localSigner.userId === user.id) ? (
                        <Autocomplete
                          inputProps={{
                            className: 'signerInput mt-15 pending',
                            placeholder: 'Cambiar de firmante',
                          }}
                          getItemValue={item => item.legalRfc}
                          items={mySigners}
                          renderItem={(item, isHighlighted) => (
                            <div
                              key={item.user}
                              style={{
                                padding: 10,
                                backgroundColor: isHighlighted ? '#F5F6F9' : '#FFFFFF',
                                color: isHighlighted ? '#2851E5' : '#000',
                                width: 300
                              }}>
                              {item.legalName}
                            </div>
                          )
                          }
                          value={value}
                          onSelect={val => this.handleSignerChange(val)}
                        />
                      ) : (
                        localSigner.updatedBy ? (
                          <p className="mbm-10">{localSigner.legalRfc.length < 13
                            ? localSigner.legalName.toUpperCase()
                            : localSigner.legalName} <br />
                            <small>Representando a {localSigner.representing}</small>
                          </p>
                        ) : (
                          <p>{localSigner.legalRfc.length < 13
                            ? localSigner.legalName.toUpperCase()
                            : localSigner.legalName}
                          </p>
                        )
                      )
                    }
                  </div>
                  <div className="col-sm-4">
                    <p>
                      { localSigner.signedAt ? `Firmó: ${moment(localSigner.signedAt).format('DD MMM YYYY h:mm a')} (CDMX)` : false }
                    </p>
                  </div>
                </div>
              ))) : (<p className="align-center">No hay firmantes</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <span>
              Con copia
            </span>
            <br />
            {recipients.length ? (recipients.map(recipient => (
              <div className="row mtm-10" key={recipient.id} style={{ color: '#555' }}>
                <div className="col-sm-1" />
                <div className="col-sm-3">
                  <p>{recipient.legalRfc}</p>
                </div>
                <div className="col-sm-4">
                  <p className="mbm-10">{recipient.legalRfc.length < 13
                    ? recipient.legalName.toUpperCase()
                    : recipient.legalName}
                  </p>
                </div>
                <div className="col-sm-3" />
              </div>
            ))) : (
              <p className="align-center">No hay copiados
              </p>
            )}
          </div>
        </div>

        <div className="row">
          {!contract.allPartiesSigned ? (
            <div className="col-sm-12 align-center">
              {signers.find(thisSigner => (thisSigner.legalRfc === user.legalRfc) && (contract.lastSignedTurn + 1 === thisSigner.turn)) ? (
                  <div>
                    {loading ? (
                      <img src="/assets/images/loader.gif" alt="loader" />
                    ) : (
                      <button className="primary" type="button" onClick={this.showModal}>
                        Ver y Firmar Contrato
                      </button>
                    )}
                    <p className="disclaimer">
                      Podrás ver el contrato antes de firmarlo
                    </p>
                  </div>
                ) : (
                  loading ? (
                    <img src="/assets/images/loader.gif" alt="loader" />
                  ) : (
                    <button
                      style={{ background: '#6C6C6C' }}
                      type="button"
                      onClick={this.showModalSigned}>
                      Ver Contrato
                    </button>
                  )
                )
              }

            </div>
          ) : (
            <div className="col-sm-12 align-center">
              {loading ? (
                <img src="/assets/images/loader.gif" alt="loader" />
              ) : (
                <button
                  style={{ background: '#6C6C6C' }}
                  type="button"
                  onClick={this.showModalSigned}>
                  Ver Contrato
                </button>
              )}
            </div>
          )}
        </div> */}

      </div>
    </div>
    );
  }
};

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps, {getEmployee})(EmployeePreview);