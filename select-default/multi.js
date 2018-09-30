import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import PropTypes from 'prop-types';

class SelectDefaultMulti extends Component {

  state = {
    initalMultiOptions: [],
    selectedMultiOptions: [],
    availableMultiOptions: [],
    showOptions: false,
  }

  componentWillMount() {
    if (this.props.inputOptions.length >= 1) {
      this.setState({
        initalMultiOptions: this.props.inputOptions,
        availableMultiOptions: this.props.inputOptions
      })
    }
  }

  handleClickOutside() {
    this.setState({ showOptions: false })
  }

  updateOptionsList(e, option, type = 'remove') {

    e.stopPropagation();

    let availableMultiOptions = [];
    let selectedMultiOptions = [];

    if (type === 'remove') {

      /**
       * remove in the available options
       * and append from selected items
      */

      availableMultiOptions = this.state.availableMultiOptions.filter(item => item.value !== option.value);
      selectedMultiOptions = [ ...this.state.selectedMultiOptions, option ];

    } else if (type === 'append') {

      /**
       * append in the available options
       * and remove from selected items
      */

      availableMultiOptions = [ ...this.state.availableMultiOptions, option ];
      selectedMultiOptions = this.state.selectedMultiOptions.filter(item => item.value !== option.value);

    } else {

      availableMultiOptions = this.state.availableMultiOption;
      selectedMultiOptions = this.state.selectedMultiOptions;
    }

    this.setState({ availableMultiOptions, selectedMultiOptions });

    // Send to main component
    this.props.onChange( selectedMultiOptions );
  }

  // Custom Html Multi Select
  renderSelectMulti() {

    let selectedMultiOptions = this.state.selectedMultiOptions;
    let availableMultiOptions = this.state.availableMultiOptions;

    return (
      <div className={ 'select-default-multi' + (!this.state.initalMultiOptions.length ? ' disabled' : '') }>

          <div
            onClick={ () => this.setState({ showOptions: !this.state.showOptions })}
            className="field">

            {(selectedMultiOptions.length === 0) ? (
              <div className="field-text">
                {
                  !this.state.initalMultiOptions.length ? (
                    this.props.inputOptionalEmptyText
                  ):(
                    this.props.inputOptionalInitialText
                  )
                }
              </div>
              ) : (
              <div className="field-selected-options flex" ref="options">
                {selectedMultiOptions.map((item, index) => (
                  <div className="selected-item" key={ index }>
                    <div className="selected-item-text">{ item.label }</div>
                    <div className="selected-item-remove text-center" onClick={ (e) => this.updateOptionsList(e,item, 'append') }>
                      <span className="fas fa-times"></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="field-caret">
              <span className={
                'fas fa-caret-' + ( !this.state.showOptions && availableMultiOptions.length > 0 ? 'down': 'up' )
              }></span>
            </div>
          </div>

        {(availableMultiOptions.length > 0 && this.state.showOptions === true) &&
          <ul
            data-top={ (this.refs.options ? (this.refs.options.clientHeight + 4) : 0) + 'px' }
            className="unstyled-list options">
            {availableMultiOptions.map((item, index) => (
              <li
                className="pointer"
                onClick={ (e) => this.updateOptionsList(e, item, 'remove') }
                key={ index }>
                { item.label }
              </li>
            ))}
          </ul>
        }

      </div>
    )
  }

  render() {
    return this.renderSelectMulti()
  }
}


SelectDefaultMulti.propTypes = {
  inputOptions: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default onClickOutside(SelectDefaultMulti);
