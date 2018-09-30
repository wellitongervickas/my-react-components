// More Details Camera
// https://mobilehtml5.org/ts/?id=23
// https://stackoverflow.com/questions/17241707/using-form-input-to-access-camera-and-immediately-upload-photos-using-web-app
// https://addpipe.com/blog/correct-syntax-html-media-capture/import React, { Component } from 'react';

// Accept: https://stackoverflow.com/questions/181214/file-input-accept-attribute-is-it-useful

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { textHelper } from '../../helpers';

class UploadDefault extends Component {

  state = {
    validationMessage: null,
  }

  componentDidMount() {
    this.validateSubmit();
  }

  validateSubmit() {
    if (this.props.inputFor && this.refs[this.props.inputFor]) {

      // Get Submit Event From Parent Form
      let form = this.refs[this.props.inputFor].form;

      if (form) {
        form.addEventListener('submit', () => {
          if (this.refs[this.props.inputFor]) {

            this.setState({
              validationMessage: this.refs[this.props.inputFor].validationMessage ?
              this.refs[this.props.inputFor].validationMessage : null
            });

            this.validateField( this.refs[this.props.inputFor] )
          }
        })
      }
    }
  }

  validateField(el) {
    if (el) {
      if(!el.validity.valid) {
        ReactDOM.findDOMNode(el).classList.add('input-error');
        this.setState({ validationMessage: el.validationMessage });
      } else {
        ReactDOM.findDOMNode(el).classList.remove('input-error')
      }
    }
  }

  renderLabel() {
    return (
      <label
        className={ 'upload-default-label' }
        htmlFor={ this.props.inputFor }>
        <div className="flex flex-center">
          { this.props.inputAwesomeIcon  && <span className={ this.props.inputAwesomeIcon }></span> }
          { this.props.inputLabel }
          { this.props.inputRequired && <span className="required">*</span> }
        </div>
        { this.props.inputFilename && <small>{ textHelper.crop(this.props.inputFilename, 30) }</small> }
      </label>
    )
  }

  renderInputParams() {
    return {
      style: { 'display': 'none' },
      type: 'file',
      name: this.props.inputFor || '',
      ref: this.props.inputFor || '',
      id: this.props.inputFor || '',
      required: this.props.inputRequired,
      disabled: this.props.inputDisabled || false,
      className: 'input-default-field',
      accept: this.props.inputAccept ? this.props.inputAccept : 'image/*;application/pdf',
      onChange: e => {
        this.setState({ validationMessage: e.target.validationMessage })
        this.validateField( e.target )
        this.props.onChange( !this.props.inputMulti ? e.target.files[0] : e.target.files )
      }
    }
  }


  renderInputWithCamera() {
    const params = this.renderInputParams();
    return React.createElement('input', {
      ...params, capture: 'camera'
    });
  }

  renderInput() {
    const params = this.renderInputParams();
    return React.createElement('input', params);
  }

  render() {
    return (
      <div className={ 'upload-default ' + (this.props.inputAditionalClass ? this.props.inputAditionalClass : '') }>
        { this.props.inputLabel && this.renderLabel() }
        { this.props.inputCamera ? this.renderInputWithCamera() : this.renderInput() }
        {
          // When input required and need to show a message
          (this.state.validationMessage && this.props.inputShowMessage !== false) &&
          <span className="input-error-message animated fadeIn">
            { this.state.validationMessage }
          </span>
        }
      </div>
    )
  }
}

UploadDefault.propTypes = {
  inputShowMessage: PropTypes.bool,
  inputAwesomeIcon: PropTypes.string,
  inputAccept: PropTypes.string,
  inputCamera: PropTypes.bool,
  inputMulti: PropTypes.bool,
  inputDisabled: PropTypes.bool,
  inputRequired: PropTypes.bool,
  inputFilename: PropTypes.string,
  inputAditionalClass: PropTypes.string,
  inputFor: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UploadDefault;
