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
            'sub1' : ['people', 'product', 'enroll', 'printer'],
            'sub2' : ['order_overview', 'goods_supplement']
        };
        let matchSubMenu = '';
        for (let i in subMenuArray) {
            // console.log('iiiiiii', i);
            subMenuArray[i].forEach(function (ownPathName) {
                // console.log('ownPathName', ownPathName);
                if ((routeBase + ownPathName) == pathName) {
                    matchSubMenu = i;
                    // console.log('hey!', i);
                }
            })
        }
        return matchSubMenu;
    },

    render : function () {
        const collapse = this.props.collapse;
        const sidebarWrapperName = collapse ? 'sidebarWrapperCollapse' : 'sidebarWrapper';
        const mode = collapse ? 'vertical' : 'inline';
        const pathName = window.location.pathname;
        const matchSubMenu = this.matchSubMenu(pathName);
        const menuList = this.props.navbar.menu;

        return (
                <div className={styles[sidebarWrapperName]} style={{transition: 'all 0.3s ease'}}>
                    <div className={styles.logo}>
                        <Link to={routeBase}>
                            <img src={imgSrc} alt="logo"/>
                        </Link>
                    </div>

                    <Menu mode={mode}
                      defaultSelectedKeys={[pathName]} defaultOpenKeys={[matchSubMenu]}>

                        {menuList[0] == '精准扶贫管理' ? (
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
                        ) : ''}

                        {menuList[1] == '社区店订单列表' ? (
                            <SubMenu key="sub2" title={<span><Icon type="home" /><span className={styles.navText}>社区店订单列表</span></span>}>
                                <Menu.Item key={routeBase + 'order_overview'}>
                                    <Link to={routeBase + 'order_overview'}>
                                        社区店订单
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={routeBase + 'goods_supplement'}>
                                    <Link to={routeBase + 'goods_supplement'} >
                                        厂商补货订单
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