/**
 * Created by dpcui on 23/12/2017.
 */

import React from 'react';
import Editor from 'wangeditor';

class EasyRichText extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      value: props.value,
      disabled: props.disabled || true,
      pasteFilterStyle: props.pasteFilterStyle || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      disabled: nextProps.disabled,
      pasteFilterStyle: nextProps.pasteFilterStyle,
    });
    if (this.editor) {
      this.editor.$textElem.attr('contenteditable', nextProps.disabled);
    }
  }

  componentDidMount() {
    const elem = this.refs.editorElem;
    const editor = new Editor(elem);
    const { menus } = this.props;
    const { disabled, pasteFilterStyle } = this.state;

    editor.customConfig.onchange = (html) => this.handleOnChange(html);
    editor.customConfig.onfocus = () => this.handleOnFocus();
    editor.customConfig.onblur = (html) => this.handleOnBlur(html);
    editor.customConfig.linkImgCallback = (url) => this.linkImgCallback(url);
    editor.customConfig.linkImgCheck = (src) => this.linkImgCheck(src);
    editor.customConfig.linkCheck = (text, link) => this.linkCheck(text, link);
    editor.customConfig.pasteTextHandle = (constext) => this.handlePasteText(constext);
    editor.customConfig.menus = menus;
    editor.customConfig.pasteFilterStyle = pasteFilterStyle;
    editor.$textElem.attr('contenteditable', disabled);
    editor.create();
    this.editor = editor;
  }

  handleOnChange = (value) => {
    this.setState({ value: html });
    this.props.onChange && this.props.onChange(value);
  };

  handleOnFocus = () => {
    this.props.onFocus && this.props.onFocus(this.state.value);
  };

  handleOnBlur = (value) => {
    this.props.onBlur && this.props.onBlur(value);
  };

  linkImgCheck = (src) => {
    this.props.linkImgCheck && this.props.linkImgCheck(src);
  };

  linkCheck = (text, link) => {
    this.props.linkCheck && this.props.linkCheck(text, link);
  };

  linkImgCallback = (url) => {
    this.props.linkImgCallback && this.props.linkImgCallback(url);
  };

  handlePasteText = (context) => {
    return this.props.pasteTextHandle && this.props.pasteTextHandle(context);
  };

  render() {
    if (this.props.reading) {
      return (
        <div>
          {this.state.value}
        </div>
      );
    }

    return (
      <div
        style={{textAlign: 'left'}}
        {...this.props}
        ref="editorElem"
      >
        {this.state.value}
      </div>
    );
  }
}

export default EasyRichText;
