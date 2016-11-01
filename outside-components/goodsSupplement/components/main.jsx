var React = require('react');
var Alert = require('react-s-alert').default;
var SearchPanel = require('./searchPanel.js');
var FilterPanel = require('./filterPanel.js');
var TableCaption = require('./tableCaption.js');
var TablePanel = require('./tablePanel.js');
var Pagination = require('./pagination.js');
var DeliverModal = require('./deliverModal.js');

var fetch = require('../helpers/fetch.js');
var url = require('../constants/AppConstants.js');

var Main = React.createClass({
    loadFromServer : function (config, type) {
        var finalConfig = {};
        if (!config) {
            finalConfig = this.state.oldGetConfig;
        } else {
            finalConfig = Object.assign({}, this.state.oldGetConfig);
            finalConfig = Object.assign(finalConfig, config);
        }

        if (type !== 'pagination') {
            delete finalConfig.page;
        }
        console.log('查询参数', finalConfig);
        fetch(finalConfig, url.goodsSupply, function (res) {
            console.log(res);
            if (res.status == 1) {
                this.setState({ rows : res.info});
                this.setState({oldGetConfig: finalConfig,
                    currentPage : res.currentPage,
                    totalPage : res.totalPage,
                    limit : res.limit,
                    totalRows : res.totalRows
                });

            } else {
                this.setState({ rows : '服务器没有返回值'});
                this.setState({oldGetConfig: finalConfig,
                    currentPage : 1,
                    totalPage : 1,
                    totalRows : 0
                });
            }
            if (type === 'filter') {
                this.setState({status : config.status});
            }
        }.bind(this), function (err) {
            console.error(err);
            this.setState({ rows : '服务器错误'})
        }.bind(this));
    },
    defaultLoad : function () {
      this.setState({
          oldGetConfig : {}
      }, function () {
          this.loadFromServer({});
      }.bind(this))  
    },
    componentDidMount : function () {
        this.loadFromServer();
    },
    getInitialState : function () {
        return {
            rows: [],
            currentDeliverOrder : {},
            modalIsOpen : false,
            modalType : 'deliver',
            oldGetConfig : {},
            currentPage : 1,
            totalPage : 1,
            limit : 3, // 每页条数
            totalRows : 2 // 总数目
        }
    },
    postDeliver : function (config) {
        console.log('postDeliver config', config);
        fetch(config, url.sendGoods, function (res) {
            if (res.status == 1 ) {
                Alert['info'](res.info, {position : 'top'});
                setTimeout(function () {
                    this.loadFromServer();
                }.bind(this), 2000)
            } else {
                Alert['warning'](res.info, {position : 'top'});
            }
            this.closeModal();
        }.bind(this), function (err) {
            Alert['error'](err.info, {position : 'top'});
            this.closeModal();
        }.bind(this));
    },
    setCurrentDeliverOrder : function (row, type) {
        this.setState({currentDeliverOrder: row, modalType: type });
    },
    openModal : function () {
        this.setState({ modalIsOpen: true});
    },
    closeModal : function () {
        this.setState({ modalIsOpen: false});
    },
    render : function () {
        return (
            <div className="container-fluid">
                <SearchPanel
                    get={this.loadFromServer}
                />
                <FilterPanel 
                    rows={this.state.rows}
                    get={this.loadFromServer}
                    config={this.state.oldGetConfig}
                />
                <TableCaption />
                <TablePanel 
                    rows={this.state.rows}
                    doOpen={this.openModal}
                    setRow={this.setCurrentDeliverOrder}
                />
                <Pagination
                    get={this.loadFromServer}
                    limit={this.state.limit}
                    totalRows={this.state.totalRows}
                    total={this.state.totalPage}
                    current={this.state.currentPage} />
                <Alert timeout={3300} />
                <DeliverModal 
                    isOpen={this.state.modalIsOpen}
                    type={this.state.modalType}
                    doClose={this.closeModal}
                    post={this.postDeliver}
                    row={this.state.currentDeliverOrder} />
                
            </div>
        )
    }
});

module.exports = Main;