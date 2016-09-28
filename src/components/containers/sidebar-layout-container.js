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
        return (
                <div className={styles[sidebarWrapperName]} style={{transition: 'all 0.3s ease'}}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <img src={imgSrc} alt="logo"/>
                        </Link>
                    </div>
                    {/*<div className={styles.listGroup}>
                        <Link className={styles.listGroupItem} to="/FPManage">
                            <i className="fa fa-suitcase" />
                            &nbsp;精准扶贫管理&nbsp;
                            <span className="caret" />
                        </Link>

                        <Link className={styles.listGroupItem} activeClassName={styles.active} to="/">
                            贫困户列表
                        </Link>
                        <Link className={styles.listGroupItem} to="/userList">
                            贫困户列表
                        </Link>
                        <Link className={styles.listGroupItem} to="/userList">
                            贫困户列表
                        </Link>
                        <Link className={styles.listGroupItem} to="/userList">
                            贫困户列表
                        </Link>

                    </div>*/}

                    <Menu mode={mode}
                      defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                      <SubMenu key="sub1" title={<span><Icon type="user" /><span className={styles.navText}>精准扶贫管理</span></span>}>
                        <Menu.Item key="1">
                            <Link to="/people">
                                贫困户列表</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/product">
                                农产品列表
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/enroll">
                                产品入库
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/printer">
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