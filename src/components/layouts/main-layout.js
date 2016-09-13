import React from 'react';
import { connect } from 'react-redux';
import styles from './main-layout.less';
import SidebarLayoutContainer from '../containers/sidebar-layout-container';


const MainLayout  = React.createClass({
    render : function () {
        return (
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <SidebarLayoutContainer />
                </div>
                <div className={styles.main}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

const mapStateToProps = function (store) {

    let something = store.mainLayoutState.something;
    let totalResults = 0;

    if (!!something) {
        totalResults = store.totalResultState;
    } else {
        totalResults = store.otherTotalResultState;
    }

    return {
        something,
        title : store.mainLayoutState.title,
        totalResults
    };

};

const mapDispatchToProps = function (dispatch) {
    
};

export default connect(mapStateToProps)(MainLayout);

