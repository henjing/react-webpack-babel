import React from 'react';
import styles from './navbar-layout-container.less';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';
import { getVillage } from '../../api/people-api';
import { getProductList } from '../../api/product-api';
import { getPrinterList } from '../../api/printer-api';
import { Menu, Dropdown, Icon, Button } from 'antd';
import ModifyPassword from '../views/modifyPassword';
import { showPasswordModal } from '../../actions/user-actions';
import store from '../../store';
import { logoutUrl, defaultAvatar } from '../../appConstants/urlConfig';

const NavbarLayoutContainer = React.createClass({
    
    componentDidMount : function () {
        userApi.getUser();
        getVillage();
        getProductList();
        
        getPrinterList();
    },

    handleClick() {
        store.dispatch(showPasswordModal());
    },

    render : function () {
        const menu = (
          <Menu>
            <Menu.Item>
              <a href={logoutUrl}>注销</a>
            </Menu.Item>
            <Menu.Item>
                <span onClick={this.handleClick}>修改密码</span>
                <ModifyPassword />
            </Menu.Item>
          </Menu>
        );
        return (
            <nav className="navbar navbar-default navbar-fixed">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="navbar-header"></div>
                            <div className="navbar-lists">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={styles.navLi}>
                                        <img src={this.props.user.wechat_avatar ? this.props.user.wechat_avatar : defaultAvatar} alt="avatar"/>
                                        &nbsp;
                                        <span>{this.props.user.user_name}</span>
                                    </li>
                                    <li className={styles.navLi + ' ' + styles.setup}>
                                        <Dropdown overlay={menu}>
                                            <a>
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