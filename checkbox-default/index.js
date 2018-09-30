import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckboxDefault extends Component {

  renderLabel() {
    return (
      <label
        className={
          'checkbox-default-label' +
          (this.props.defaultChecked === true ? ' checkbox-default-label--active' : '') +
          (this.props.inputDisabled === true ? ' checkbox-default-label--disabled' : '')
        }
        htmlFor={ this.props.inputFor }>
        { this.props.inputLabel }
      </label>
    )
  }

  renderInput() {

    const params = {
      type: 'checkbox',
      name: this.props.inputFor || '',
      ref: this.props.inputFor || '',
      id: this.props.inputFor || '',
      readOnly: this.props.inputDisabled || false,
      disabled: this.props.inputDisabled || false,
      className: 'checkbox-default-field ' + (this.props.inputAditionalClass ? this.props.inputAditionalClass : ''),
      value: `${this.props.defaultValue}` || '',
      checked: this.props.defaultChecked || '',
      onChange: (e => this.props.onChange( e.target.checked ) ),
    }

    return React.createElement('input', params);
  }

  render() {
    return (
      <div className="checkbox-default">
        { this.renderLabel() }
        { this.renderInput() }
      </div>
    )
  }
};

CheckboxDefault.propTypes = {
  inputDisabled: PropTypes.bool,
  inputLabel: PropTypes.string,
  defaultValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ]).isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  inputAditionalClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxDefault;
