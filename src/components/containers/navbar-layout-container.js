import React from 'react';
import styles from './navbar-layout-container.less';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';


const NavbarLayoutContainer = React.createClass({
    
    componentDidMount : function () {
        // userApi.getUser();
        
    },
    render : function () {
        return (
            <nav className="navbar navbar-default navbar-fixed">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="navbar-header"></div>
                            <div className="navbar-lists">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={styles.navLi}>
                                        {/*<img src={this.props.user.wechat_avatar ? this.props.wechat_avatar : '/img/avatar.jpg'} alt="avatar"/>*/}
                                        <span>{this.props.user.user_name}</span>
                                    </li>
                                    <li className={styles.navLi + ' ' + styles.setup}>
                                        <a href="#">
                                            <span className="fa fa-cog" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        user : store.navbarLayoutState
    }
};

export default connect(mapStateToProps)(NavbarLayoutContainer);