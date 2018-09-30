import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SelectDefaultMulti from './multi';

class SelectDefault extends Component {

  state = {
    validationMessage: null
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


  renderSelectMulti() {
    return <SelectDefaultMulti
      inputOptionalInitialText={ this.props.inputOptionalInitialText }
      inputOptionalEmptyText={ this.props.inputOptionalEmptyText }
      inputOptions={ this.props.inputOptions }
      onChange={ options => this.props.onChange( options ) }
    />
  }

  renderSelect() {

    const params = {
      ref: this.props.inputFor || '',
      disabled: this.props.inputDisabled || false,
      required: this.props.inputRequired || false,
      name: this.props.inputFor,
      id: this.props.inputFor,
      value: this.props.defaultValue,
      className: 'select-default-field',
      onChange: e => {
        this.setState({ validationMessage: e.target.validationMessage })
        this.props.onChange( e.target.value )
        this.validateField( e.target )
      }
    }

    return React.createElement('select', params,
      this.props.inputOptions &&
      this.props.inputOptions.length === 0 && (
        <option
          disabled="disabled"
          value="">
          { this.props.inputOptionalEmptyText ? this.props.inputOptionalEmptyText : 'Não há opções' }
        </option>
      ),
      this.props.inputOptions &&
      this.props.inputOptions.length >= 1 && (
        <option
          disabled="disabled"
          value="">
          { this.props.inputOptionalInitialText ? this.props.inputOptionalInitialText : 'Selecione' }
        </option>
      ),
      this.props.inputOptions &&
      this.props.inputOptions.length > 0 &&
      this.props.inputOptions.map((item, index) =>
        <option key={ index } value={ item.value }>
          { item.label }
        </option>
      )
    )
  }

  renderLabel() {
    return (
      <label
        className="select-default-label label"
        htmlFor={ this.props.inputFor }>
        { this.props.inputLabel }
        { this.props.inputRequired && <span className="required">*</span> }
      </label>
    )
  }

  render() {
    return (
      <div className={ 'select-default ' + (this.props.inputAditionalClass ? this.props.inputAditionalClass : '') }>
        { this.props.inputLabel && this.renderLabel() }
        { this.props.inputMulti ? this.renderSelectMulti() : this.renderSelect() }
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

SelectDefault.propTypes = {

  // Options
  inputShowMessage: PropTypes.bool,
  inputMulti: PropTypes.bool,
  inputOptionalEmptyText: PropTypes.string,
  inputOptionalInitialText: PropTypes.string,
  inputOptions: PropTypes.array,

  // Validation
  inputDisabled: PropTypes.bool,
  inputRequired: PropTypes.bool,

  // Customization
  inputAditionalClass: PropTypes.string,

  // Initial Values
  inputPlaceholder: PropTypes.string,
  defaultValue: PropTypes.string,
  inputFor: PropTypes.string.isRequired,
  inputLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SelectDefault;
