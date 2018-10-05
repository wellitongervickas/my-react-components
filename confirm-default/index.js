import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfirmDefault extends Component {

  renderContent(children) {
    return children && Array.isArray(children) ? children.map(item => item ) :  children
  }

  render() {

    if (this.props.enabled) {
      return (
        <div className="confirm-default flex flex-around-center">
          <div className="confirm-default-body wrapper animated slideInDown">
            <div className="confirm-default-content">
              { this.renderContent(this.props.children) }
            </div>
            <div className="btn-control">
              <button
                type="button"
                onClick={ () => this.props.onCancel(true) }
                className="btn btn-md">
                { this.props.cancelTitle ? this.props.cancelTitle : 'Cancel' }
              </button>
              <button
                onClick={ () => this.props.onConfirm(true) }
                className="btn btn-md btn-primary">
                { this.props.confirmTitle ? this.props.confirmTitle : 'Confirm' }
              </button>
            </div>
          </div>
        </div>
      )
    }

    return null;
  }
};

ConfirmDefault.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDefault;
