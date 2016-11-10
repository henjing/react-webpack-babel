import React from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;
import { connect } from 'react-redux';

const SearchInput = React.createClass({
  getInitialState() {
    return {
      focus: false
    };
  },

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
      this.props.search();
  },
  handleInputChange(e) {
      // store.dispatch(updatePeopleSearch({ search : e.target.value}));
      this.props.update(e.target.value);
  },
  render() {
    const { style, placeholder, value } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.props.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper" style={style}>
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

function mapStateToProps(store) {
    return {
        value : store.appInteractionState.villageSearch
    }
}

export default connect(mapStateToProps)(SearchInput);