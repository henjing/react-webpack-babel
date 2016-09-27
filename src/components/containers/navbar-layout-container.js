import React from 'react';
import styles from './navbar-layout-container.less';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" href="/Administrator/logout">注销</a>
    </Menu.Item>
  </Menu>
);


const NavbarLayoutContainer = React.createClass({
    
    componentDidMount : function () {
        userApi.getUser();
        
    },
    render : function () {
        return (
            <nav className="navbar navbar-default navbar-fixed">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="navbar-header"></div>
                            <div className="navbar-lists">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={styles.navLi}>
                                        <img src={this.props.user.wechat_avatar ? this.props.user.wechat_avatar : '/img/avatar.jpg'} alt="avatar"/>
                                        <span>{this.props.user.user_name}</span>
                                    </li>
                                    <li className={styles.navLi + ' ' + styles.setup}>
                                        <Dropdown overlay={menu}>
                                            <a href="#">
                                                <span className="fa fa-cog" />
                                            </a>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        user : store.navbarLayoutState
    }
};

export default connect(mapStateToProps)(NavbarLayoutContainer);