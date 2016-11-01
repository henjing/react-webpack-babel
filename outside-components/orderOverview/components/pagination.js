var React = require('react');
var Pagination = require('rc-pagination');
require('rc-pagination/assets/index.css');

var PaginationContainer = React.createClass({
    onChange : function (page) {
        this.props.get({
            page : page
        }, 'pagination');
    },
    render : function () {
        return (
           <div className="row kd-pagination">
               <Pagination
                  className="ant-pagination"
                  current={parseInt(this.props.current)}
                  total={parseInt(this.props.totalRows)}
                  pageSize={parseInt(this.props.limit)}
                  onChange={this.onChange}
               />
           </div>
        )
    }
});

module.exports = PaginationContainer;