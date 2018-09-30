import React, { Component } from 'react';

// https://quilljs.com/docs/
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class TextareaEditor extends Component {

  state = {
    editorState: '',
  }

  componentDidMount() {
    if (this.props.inputValue) {
      this.setState({
        editorState: this.props.inputValue
      })
    }
  }

  handleChange(value) {
    this.setState({ editorState: value });
    this.props.onChange(value);
  }

  render() {
    return <ReactQuill
      readOnly={ this.props.inputDisabled }
      value={ this.state.editorState }
      onChange={ e => this.handleChange(e) }
    />
  }
};
