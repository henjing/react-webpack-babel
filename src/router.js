import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import PeopleContainer from './components/containers/people-container';
import ProductContainer from './components/containers/product-container';
import EnrollContainer from './components/containers/enroll-container';
import PrinterContainer from './components/containers/printer-container';
import VillageContainer from './components/containers/village-container';

// Layouts
import MainLayout from './components/layouts/main-layout';
// Route base
import { routeBase } from './appConstants/urlConfig';

// 外部组件 用户订单
import orderOverviewContainer from '../outside-components/orderOverview/index.js';
// 外部组件 厂商补货订单
import goodsSupplementContainer from '../outside-components/goodsSupplement/index.js';

/////// 厂商提现管理
import applyingContainer from './components/containers/cashier-applying-container';
// 查看详情
import cashierAccountDetail from './components/containers/detail-template';
// 付款
import cashierPayContainer from './components/containers/cashier-paying-container';
// 已付款
import cashierPayedContainer from './components/containers/cashier-payed-container';
// 已驳回
import cashierRejectedContainer from './components/containers/cashier-rejected-container';

// 土货结算
import tuHuoJieSuanContainer from './components/containers/tuhuo-jiesuan-container';
// 收款账户
import shouKuanAccountContainer from './components/containers/tuhuo-bank-account-container';

export default (
    <Router history={browserHistory}>
        <Route path={routeBase} component={MainLayout} >

            <IndexRedirect to={'people'} />
            <Route breadcrumbName="贫困户列表" path={'people'} component={PeopleContainer}>

            </Route>
           
            <Route breadcrumbName="农产品列表" path={'product'} component={ProductContainer}>

            </Route>
           
            <Route breadcrumbName="产品入库" path={'enroll'} component={EnrollContainer}>

            </Route>

            <Route breadcrumbName="土货结算" path={'tu_huo'} component={tuHuoJieSuanContainer}>

            </Route>

            <Route breadcrumbName="收款账户" path={'shou_kuan'} component={shouKuanAccountContainer}>

            </Route>

            <Route breadcrumbName="打印机列表" path={'printer'} component={PrinterContainer}>

            </Route>

            <Route breadcrumbName="村列表" path={'village'} component={VillageContainer}>

            </Route>

            {/*外部组件*/}
            <Route breadcrumbName="用户订单" path={'order_overview'} component={orderOverviewContainer}>

            </Route>
            <Route breadcrumbName="厂商发货订单" path={'goods_supplement'} component={goodsSupplementContainer}>

            </Route>
            
            {/*提现管理*/}
            <Route breadcrumbName="审核" path={'applying'} component={applyingContainer}>
                <Route breadcrumbName="结算单详情" path={'apply_detail/:account_sn'} component={cashierAccountDetail} />
            </Route>

            <Route breadcrumbName="付款" path={'paying'} component={cashierPayContainer}>
                <Route breadcrumbName="结算单详情" path={'paying_detail/:account_sn'} component={cashierAccountDetail} />
            </Route>

            <Route breadcrumbName="已付款" path={'pay_success'} component={cashierPayedContainer}>
                <Route breadcrumbName="结算单详情" path={'pay_success_detail/:account_sn'} component={cashierAccountDetail} />
            </Route>
            
            <Route breadcrumbName="已驳回" path={'rejected'} component={cashierRejectedContainer}>
                <Route breadcrumbName="结算单详情" path={'rejected_detail/:account_sn'} component={cashierAccountDetail} />
            </Route>
        </Route>
    </Router>
)
