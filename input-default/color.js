import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'

// https://github.com/casesandberg/react-color/
import { SketchPicker } from 'react-color';

class InputDefaultColor extends Component {

  handleClickOutside() {
    this.props.hideColorPicker()
  }

  render() {
    return (
      <div className="color-picker">
        <SketchPicker
          color={ this.props.inputValue }
          onChangeComplete={ e => this.props.onChange( e ) }
        />
      </div>
    )
  }
}

export default onClickOutside(InputDefaultColor);
