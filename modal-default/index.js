import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalDefault extends Component {

  renderContent(children) {
    return children && Array.isArray(children) ? children.map(item => item ) :  children
  }

  render() {

    const { options, enabled } = this.props;

    if (enabled) {
      return (
        <div className="modal-default flex flex-around-center">
          <div className="modal-default-body wrapper">
            <div className="modal-default-content">
              { this.renderContent(this.props.children) }
            </div>
            {(options && options.defaultActions) &&
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
            }
          </div>
        </div>
      )
    }

    return null;
  }
};

ModalDefault.propTypes = {
  options: PropTypes.object,
};

export default ModalDefault;
