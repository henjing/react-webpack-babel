var React = require('react');
var Alert = require('react-s-alert').default;
var SearchPanel = require('./searchPanel.js');
var FilterPanel = require('./filterPanel.js');
var TableCaption = require('./tableCaption.js');
var TablePanel = require('./tablePanel.js');
var Pagination = require('./pagination.js');

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
        fetch(finalConfig, url.getOrder, function (res) {
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
                this.setState({ rows : '服务器没有返回值'})
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
        this.defaultLoad();
    },
    getInitialState : function () {
        return {
            rows: [],
            oldGetConfig : {},
            currentPage : 1,
            totalPage : 1,
            limit : 3, // 每页条数
            totalRows : 2 // 总数目
        }
    },
    render : function () {
        return (
            <div className="container-fluid">
                <SearchPanel
                    get={this.loadFromServer}
                />
                <FilterPanel 
                    config={this.state.oldGetConfig}
                    get={this.loadFromServer}
                />
                <TableCaption />
                <TablePanel 
                    rows={this.state.rows}
                />
                <Pagination
                    get={this.loadFromServer}
                    limit={this.state.limit}
                    totalRows={this.state.totalRows}
                    total={this.state.totalPage}
                    current={this.state.currentPage} />
                <Alert timeout={3300} />
                
            </div>
        )
    }
});

module.exports = Main;