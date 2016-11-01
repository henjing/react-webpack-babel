var React = require('react');

var TableRow = require('./tableRow.js');

var TablePanel = React.createClass({
    getInitialState : function () {
        return {
            rows : this.props.rows || '无返回结果'
        }
    },
    componentWillReceiveProps : function (nextProps) {
        if (nextProps.rows) {
            this.setState({rows : nextProps.rows});
        }
    },
    show : function (rows) {
        var resultRows = [];
        var row = {};
        var id = '';
        for (var i = 0; i < rows.length; i++) {
            row = rows[i];
            id = row['record_sn'];
            resultRows.push(
                <TableRow 
                    setRow={this.props.setRow}
                    doOpen={this.props.doOpen} key={id} row={row} />
            );
        }
        return (
            <div>
                {resultRows}
                <div className="clearfix"></div>
            </div>
        )
    },
    render : function () {
        if (typeof this.state.rows == 'string') {
            return (
                <div>
                    {this.state.rows}
                </div>
            )
        } else {
            return this.show(this.state.rows);
        }
    }
});

module.exports = TablePanel;