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
import { getProvinces } from '../../api/app-interacton-api';
import { Row, Col } from 'antd';

const NavbarLayoutContainer = React.createClass({
    
    componentDidMount : function () {
        userApi.getUser();
        getVillage();
        // getProvinces();
        getPrinterList();
        getProductList();
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
            <nav style={{marginBottom : '0px', background : 'white', position : 'relative', height : '80px', lineHeight : '80px', borderBottom : '1px solid #e7e7e7' }}>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <ul style={{float : 'right'}}>
                                    <li className={styles.navLi}>
                                        <img src={this.props.user.info.wechat_avatar ? this.props.user.info.wechat_avatar : defaultAvatar} alt="avatar"/>
                                        &nbsp;
                                        <span>{this.props.user.info.user_name}</span>
                                    </li>
                                    <li className={styles.navLi + ' ' + styles.setup}>
                                        <Dropdown overlay={menu}>
                                            <a>
                                                <span className="fa fa-cog" />
                                            </a>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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