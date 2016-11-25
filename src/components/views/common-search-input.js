import React from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;

const SearchInput = React.createClass({
  getInitialState() {
    return {
        focus: false,
        value : '',
    };
  },

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },

  handleInputChange(e) {
      this.setState({value : e.target.value});
      this.props.updateSearchState('search', e.target.value);
  },

  handleSearch() {
      this.props.search();
  },

  render() {
    const { style, placeholder } = this.props;
    const { value } = this.state;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper lineHeight" style={style}>
        <InputGroup className={searchCls}>
          <Input placeholder={placeholder} value={value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  },
});

export default SearchInput;