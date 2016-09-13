import React from 'react';
import styles from './sidebar-layout-container.less';
import { Link } from 'react-router';
// import sidebarLinks from '../../appConstants/sidebarLinks';
import imgSrc from '../../appConstants/assets/images/logo_white.png';

const SidebarLayoutContainer = React.createClass({
    render : function () {
        return (
                <div className={styles.sidebarWrapper}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <img src={imgSrc} alt="logo"/>
                        </Link>
                    </div>
                    <div className={styles.listGroup}>
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

                    </div>

                    <div className={styles.listGroup}>
                        <Link className={styles.listGroupItem} to="/FPManage">
                            <i className="fa fa-suitcase" />
                            &nbsp;线下店订单列表&nbsp;
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

                    </div>
                </div>
            )

    }
});

export default SidebarLayoutContainer;