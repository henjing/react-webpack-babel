import React from 'react';
import styles from './sidebar-layout-container.less';
import { Link } from 'react-router';
// import sidebarLinks from '../../appConstants/sidebarLinks';

const SidebarLayoutContainer = React.createClass({
    render : function () {
        return (
                <div className={styles.sidebarWrapper}>
                    <div className={styles.logo}>
                        
                    </div>
                </div>
            )

    }
});

export default SidebarLayoutContainer;