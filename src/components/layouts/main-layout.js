import React from 'react';
import { connect } from 'react-redux';
import styles from './main-layout.less';
import SidebarLayoutContainer from '../containers/sidebar-layout-container';
import NavbarLayoutContainer from '../containers/navbar-layout-container';


const MainLayout  = React.createClass({
    render : function () {
        return (
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <SidebarLayoutContainer />
                </div>
                <div className={styles.main}>
                    <NavbarLayoutContainer />
                    {/*this.props.children*/}
                </div>
            </div>
        )
    }
});

const mapStateToProps = function (store) {


    

    return {

    };

};



export default connect(mapStateToProps)(MainLayout);

