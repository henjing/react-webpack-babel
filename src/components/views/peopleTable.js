import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Button, Col } from 'antd';
import { updatePeopleSearch, peopleFormEdit } from '../../actions/people-actions';
import { getPeople, deletePeople } from '../../api/people-api';
import { Popconfirm } from 'antd';

const PeopleTable = React.createClass({
    getColumns() {
        const columns = [{
            title : '编号',
            dataIndex : 'id',
            key : 'id'
        }, {
            title : '姓名',
            key : 'name',
            dataIndex : 'name',
            render : (text, record, index) => {
                // console.log('text', text, 'record', record, 'index', index);
                return (
                    <span>
                        <img style={{width:60, height:60}} src={record.head_img} alt="" className="img-circle"/>
                        &nbsp;
                        {text}
                    </span>
                )
            }
        }, {
            title : '手机号',
            dataIndex : 'phone',
            key : 'phone'
        }, {
            title : '所在村',
            dataIndex : 'villageInfo',
            key : 'villageInfo'
        }, {
            title : '简介',
            dataIndex : 'profile',
            key : 'profile',
            className : 'width50em'
        }, {
            title : '录入时间',
            dataIndex : 'add_time',
            key : 'add_time',
            render : (text,record, index) => {
                return (new Date(parseInt(text) * 1000)).toLocaleDateString()
            }
        }, {
            title : '备注',
            dataIndex : 'remark',
            key : 'remark'
        }, {
            title : '操作',
            render : (text, record, index) => {
                return (
                    <Col>
                        <Button onClick={this.handleClick(record)} size="small" icon="edit">编辑</Button>
                        &nbsp;
                        <Popconfirm title="确认删除此信息吗" onConfirm={this.deleteRow(record)} okText="删除" cancelText="取消">
                            <Button size="small" icon="delete">删除</Button>
                        </Popconfirm>
                    </Col>
                )
            }
        }];

        return columns;
    },

    deleteRow(record) {
        return () => {
            deletePeople({ id : parseInt(record.id)});
        }
    },
    
    handleClick(record) {
        return () => {
            this.props.dispatch(peopleFormEdit(Object.assign({}, {...record}, { type : 'edit', visible : true })));
        }
    },

    onChange(page) {
        this.props.dispatch(updatePeopleSearch({ page : page }));
        getPeople();
    },

    render() {
        const columns = this.getColumns();
        const dataSource = this.props.dataSource;
        
        return (
            <Table pagination={{ current : this.props.current, total : this.props.total, onChange : this.onChange }} columns={columns} dataSource={dataSource} />
        )

    }
});

const mapStateToProps = function (store) {
    return {
        dataSource : Object.assign([], store.peopleState.info),
        current : store.peopleState.currentPage,
        total : store.peopleState.totalRows,
    }
};

export default connect(mapStateToProps)(PeopleTable)