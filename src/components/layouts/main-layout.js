import React from 'react';
import { connect } from 'react-redux';
import styles from './main-layout.less';
import SidebarLayoutContainer from '../containers/sidebar-layout-container';
import NavbarLayoutContainer from '../containers/navbar-layout-container';
import { Breadcrumb } from 'antd';
import ReactRouter from 'react-router';

const MainLayout  = React.createClass({
    render : function () {
        const collapse = this.props.collapse;
        const wrapperName = collapse ? 'wrapperCollapse' : 'wrapper';
        return (
            <div className={styles[wrapperName]}>
                <div className={styles.sidebar}>
                    <SidebarLayoutContainer />
                </div>
                <div className={styles.main}>
                    <NavbarLayoutContainer />
                    {/*<div style={{height : '30px', lineHeight : '30px', paddingLeft : '15px',background: '#f4f4f5'}}>
                        <Breadcrumb {...this.props} router={ReactRouter} />
                    </div>*/}

                    <div>

                        {this.props.children}

                    </div>

                </div>
            </div>
        )
    }
});

const mapStateToProps = function (store) {

    return {
        collapse : store.collapseState.collapse
    };

};



export default connect(mapStateToProps)(MainLayout);

