var React = require('react');

var InputGroup = React.createClass({
    render : function () {
        var rows = [];
        var keys = ['search', 'dateStart', 'dateEnd', 'timeLimit', 'status'];
        var key = '';
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (key in this.props.config && (!!this.props.config[key])) {
                rows.push(
                    <input key={key} type="hidden" name={key} value={this.props.config[key]} />
                )
            }
        }
        return (
            <div>
                {rows}
            </div>
        )
    }
});

module.exports = InputGroup;