import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import styles from './sidebar-layout-container.less';
import { Link } from 'react-router';
import { collapseFunc } from '../../api/collapse-api';
import imgSrc from '../../appConstants/assets/images/logo_white.png';
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const SidebarLayoutContainer = React.createClass({

      onCollapseChange() {
          store.dispatch(collapseFunc());
      },

    render : function () {
        const collapse = this.props.collapse;
        const sidebarWrapperName = collapse ? 'sidebarWrapperCollapse' : 'sidebarWrapper';
        const mode = collapse ? 'vertical' : 'inline';
        const pathName = window.location.pathname;
        return (
                <div className={styles[sidebarWrapperName]} style={{transition: 'all 0.3s ease'}}>
                    <div className={styles.logo}>
                        <Link to="/admin/village/index/">
                            <img src={imgSrc} alt="logo"/>
                        </Link>
                    </div>

                    <Menu mode={mode}
                      defaultSelectedKeys={[pathName]} defaultOpenKeys={['sub1']}>
                      <SubMenu key="sub1" title={<span><Icon type="user" /><span className={styles.navText}>精准扶贫管理</span></span>}>
                        <Menu.Item key="/admin/village/index/people">
                            <Link to="/admin/village/index/people" activeClassName={styles.activeName}>
                                贫困户列表</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/village/index/product">
                            <Link to="/admin/village/index/product" activeClassName={styles.activeName}>
                                农产品列表
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/village/index/enroll">
                            <Link to="/admin/village/index/enroll" activeClassName={styles.activeName}>
                                产品入库
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/village/index/printer">
                            <Link to="/admin/village/index/printer" activeClassName={styles.activeName}>
                                打印机信息
                            </Link>
                        </Menu.Item>
                      </SubMenu>


                    </Menu>
                    <div className={styles.antAsideAction} onClick={this.onCollapseChange}>
                        {collapse ? <Icon type="right" /> : <Icon type="left" />}
                    </div>
                </div>
            )

    }
});

function mapStateToProps(store) {
    return {
        collapse : store.collapseState.collapse
    }
}

export default connect(mapStateToProps)(SidebarLayoutContainer);