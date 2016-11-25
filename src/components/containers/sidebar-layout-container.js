import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import styles from './sidebar-layout-container.less';
import { Link } from 'react-router';
import { collapseFunc } from '../../api/collapse-api';
import imgSrc from '../../appConstants/assets/images/logo_white.png';
import { Menu, Breadcrumb, Icon } from 'antd';
import { routeBase } from '../../appConstants/urlConfig';
const SubMenu = Menu.SubMenu;

const SidebarLayoutContainer = React.createClass({

      onCollapseChange() {
          store.dispatch(collapseFunc());
      },

    //匹配的导航列表
    matchSubMenu(pathName) {
        const subMenuArray =  {
            'sub1' : ['people', 'product', 'village', 'enroll', 'printer'],
            'sub2' : ['order_overview', 'goods_supplement'],
            'sub3' : ['applying', 'paying', 'pay_success', 'rejected']
        };
        let matchSubMenu = '';
        let defaultSelectedKey = '';
        for (let i in subMenuArray) {
            // console.log('iiiiiii', i);
            subMenuArray[i].forEach(function (ownPathName) {
                // console.log('ownPathName', ownPathName);
                if (routeBase + ownPathName == pathName) {
                    matchSubMenu = i;
                    defaultSelectedKey = routeBase + ownPathName;
                    // console.log('hey!', i);
                }
            })
        }
        // console.log('aaaaaaaaa', [matchSubMenu, defaultSelectedKey]);
        return [matchSubMenu, defaultSelectedKey];
    },

    render : function () {
        const collapse = this.props.collapse;
        const sidebarWrapperName = collapse ? 'sidebarWrapperCollapse' : 'sidebarWrapper';
        const mode = collapse ? 'vertical' : 'inline';
        const pathName = window.location.pathname;
        // const pathName = window.location.hash.slice(1, 8);
        const matchSubMenu = this.matchSubMenu(pathName);
        const menuList = process.env.NODE_ENV === 'production' ? this.props.navbar.info.menu : ['精准扶贫管理', '社区店订单列表'];
        const isSuper = process.env.NODE_ENV === 'production' ? this.props.navbar.info.super : 1;
        // console.log('isSuper', isSuper);
        let fuPinRender = (isSuper == 1) ? (
            <SubMenu key="sub1" title={<span><Icon type="user" /><span className={styles.navText}>精准扶贫管理</span></span>}>
                <Menu.Item key={routeBase + 'people'}>
                    <Link to={routeBase + 'people'}>
                        贫困户列表</Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'product'}>
                    <Link to={routeBase + 'product'} >
                        农产品列表
                    </Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'village'}>
                    <Link to={routeBase + 'village'} >
                        村列表
                    </Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'enroll'}>
                    <Link to={routeBase + 'enroll'} >
                        产品入库
                    </Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'printer'}>
                    <Link to={routeBase + 'printer'} >
                        打印机信息
                    </Link>
                </Menu.Item>
              </SubMenu>
        ) : (
            <SubMenu key="sub1" title={<span><Icon type="user" /><span className={styles.navText}>精准扶贫管理</span></span>}>
                <Menu.Item key={routeBase + 'people'}>
                    <Link to={routeBase + 'people'}>
                        贫困户列表</Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'product'}>
                    <Link to={routeBase + 'product'} >
                        农产品列表
                    </Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'enroll'}>
                    <Link to={routeBase + 'enroll'} >
                        产品入库
                    </Link>
                </Menu.Item>
                <Menu.Item key={routeBase + 'printer'}>
                    <Link to={routeBase + 'printer'} >
                        打印机信息
                    </Link>
                </Menu.Item>
              </SubMenu>
        );

        return (
                <div className={styles[sidebarWrapperName]} style={{transition: 'all 0.3s ease'}}>
                    <div className={styles.logo}>
                        <Link to={routeBase}>
                            <img src={imgSrc} alt="logo"/>
                        </Link>
                    </div>

                    <Menu mode={mode}
                        defaultSelectedKeys={[matchSubMenu[1]]} defaultOpenKeys={[matchSubMenu[0]]}>

                        {menuList[0] == '精准扶贫管理' ? (
                            fuPinRender
                        ) : ''}

                        {menuList[0] == '社区店订单列表' ? (
                            <SubMenu key="sub2" title={<span><Icon type="home" /><span className={styles.navText}>社区店订单列表</span></span>}>
                                <Menu.Item key={routeBase + 'order_overview'}>
                                    <Link to={routeBase + 'order_overview'}>
                                        用户订单
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'goods_supplement'}>
                                    <Link to={routeBase + 'goods_supplement'} >
                                        厂商发货订单
                                    </Link>
                                </Menu.Item>
                              </SubMenu>

                        ) : ''}

                        {menuList[0] == '社区店订单列表' ? (
                            <SubMenu key="sub3" title={<span><Icon type="pay-circle-o" /><span className={styles.navText}>厂商提现</span></span>}>
                                <Menu.Item key={routeBase + 'applying'}>
                                    <Link to={routeBase + 'applying'}>
                                        审核
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'paying'}>
                                    <Link to={routeBase + 'paying'}>
                                        付款
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'pay_success'}>
                                    <Link to={routeBase + 'pay_success'}>
                                        已付款
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'rejected'}>
                                    <Link to={routeBase + 'rejected'}>
                                        已驳回
                                    </Link>
                                </Menu.Item>
                            </SubMenu>

                        ) : ''}

                        {menuList[1] == '社区店订单列表' ? (
                            <SubMenu key="sub2" title={<span><Icon type="home" /><span className={styles.navText}>社区店订单列表</span></span>}>
                                <Menu.Item key={routeBase + 'order_overview'}>
                                    <Link to={routeBase + 'order_overview'}>
                                        用户订单
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'goods_supplement'}>
                                    <Link to={routeBase + 'goods_supplement'} >
                                        厂商发货订单
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        ) : ''}

                        {menuList[1] == '社区店订单列表' ? (
                            <SubMenu key="sub3" title={<span><Icon type="pay-circle-o" /><span className={styles.navText}>厂商提现</span></span>}>
                                <Menu.Item key={routeBase + 'applying'}>
                                    <Link to={routeBase + 'applying'}>
                                        审核
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'paying'}>
                                    <Link to={routeBase + 'paying'}>
                                        付款
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'pay_success'}>
                                    <Link to={routeBase + 'pay_success'}>
                                        已付款
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'rejected'}>
                                    <Link to={routeBase + 'rejected'}>
                                        已驳回
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        ) : ''}
                        
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
        collapse : store.collapseState.collapse,
        navbar : store.navbarLayoutState
    }
}

export default connect(mapStateToProps)(SidebarLayoutContainer);