import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextareaEditor from './editor';

class TextareaDefault extends Component {

  renderRichText() {
    return <TextareaEditor
      inputDisabled={ this.props.inputDisabled }
      onChange={ e => this.props.onChange(e) }
      inputValue={ this.props.inputValue }
    />
  }

  renderTextarea() {

    const params = {
      required: this.props.inputRequired || false,
      cols: this.props.inputCols || 30,
      rows: this.props.inputRows || 5,
      name: this.props.inputFor || '',
      ref: this.props.inputFor || '',
      id: this.props.inputFor || '',
      readOnly: this.props.hasOwnProperty('inputOnlyRead') ? this.props.inputOnlyRead : this.props.inputDisabled,
      disabled: this.props.inputDisabled || false,
      placeholder: this.props.inputPlaceholder || '',
      autoFocus: this.props.inputFocus || false,
      className: 'textarea-default-field ' + (this.props.inputAditionalClass ? this.props.inputAditionalClass : ''),
      value: this.props.inputValue || '',
      onChange: ( (e) => this.props.onChange( e.target.value )),
    }

    return React.createElement('textarea', params);
  }


  render() {
    return (
      <div className="textarea-default">

        {this.props.inputLabel &&
          <label
            className="textarea-default-label label"
            htmlFor={ this.props.inputFor }>
            { this.props.inputLabel }
            { this.props.inputIsRequired && <span className="required">*</span> }
          </label>
        }

        { !this.props.inputEditor ? this.renderTextarea() : this.renderRichText() }
      </div>
    )
  }
}

TextareaDefault.propTypes = {

  // Validations
  inputEditor: PropTypes.bool,
  inputRequired: PropTypes.bool,
  inputOnlyRead: PropTypes.bool,
  inputDisabled: PropTypes.bool,
  inputCols: PropTypes.number,
  inputRows: PropTypes.number,

  // Titles
  inputLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,

  /// Initial Status
  inputAditionalClass: PropTypes.string,
  inputValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]).isRequired,
  inputFor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextareaDefault;
