import React from 'react';
import { connect } from 'react-redux';
import { getVillageDetailList, getCities, getDistricts, getProvinces, getVillages } from '../../api/app-interacton-api';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message, Cascader, TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import store from '../../store';
import { updateAppInteractionState } from '../../actions/app-actions';
import SearchInput from '../views/commonSearchInput';

let VillageContainer = React.createClass({
    
    componentDidMount() {
        getVillageDetailList({});
    },
    componentWillMount() {
        console.log('optionoptionoption', this.props.provinces.info);
        this.setState({
            treeData : this.props.provinces.info.map(function (option) {
                return {
                    value : option.province_id,
                    label : option.province_name,
                    tag : option.tag
                }
            })
        })
    },
    getColumns() {
        return [{
            title : '编号',
            key : 'id',
            dataIndex : 'id'
        }, {
            title : '所属省',
            key : 'province',
            dataIndex : 'province'
        }, {
            title : '所属市',
            key : 'city',
            dataIndex : 'city'
        }, {
            title : '所属县',
            key : 'district',
            dataIndex : 'district'
        }, {
            title : '所属村',
            key : 'village',
            dataIndex : 'village'
        }, {
            title : '第一书记',
            key : 'user_name',
            dataIndex : 'user_name'
        }, {
            title : '手机号',
            key : 'cellphone',
            dataIndex : 'cellphone'
        }]
    },
    getInitialState() {
        return {
            isVisible : false,
            treeData : []
        }
    },

    updateKeywordSearch(search) {
        store.dispatch(updateAppInteractionState({ villageSearch : search }));
    },
    updatePageSearch(page) {
        // console.log('pagepagepagepage', page);
        store.dispatch(updateAppInteractionState({ villagePageSearch : page }));

        setTimeout(function () {
            this.pageSearch();
        }.bind(this), 0);
    },
    commonSearch() {
        // commonSearch会把page设置为1再进行搜索
        const { search } = this.props;
        getVillageDetailList({ search : search, page : 1});
    },
    pageSearch() {
        // pageSearch指的是翻页
        const { search, page } = this.props;
        // console.log('pagepagepage', page, 'search', search);
        getVillageDetailList({ search : search, page : page});
    },

    showModal() {
        this.setState({ isVisible : true });
    },
    hideModal() {
        this.setState({ isVisible : false });
    },

    handleSubmit() {

    },

    onSelect(info) {
        console.log('selected', info);
    },
    onLoadData(treeNode) {
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         const treeData = [...this.state.treeData];
        //         getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode, 2));
        //         this.setState({treeData});
        //         resolve();
        //     }, 500);
        // });
        console.log('treeNode', treeNode);
    },
    
    render() {
        const dataSource = this.props.villageList;
        const columns = this.getColumns();
        const visible = this.state.isVisible;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 13}
        };
        const { current_page, totalRows } = this.props.other;
        const pagination = { current : parseInt(current_page), total : totalRows, onChange : this.updatePageSearch.bind(this) };

        const loop = (data) => {
            return data.map((item) => {
                if (item.children) {
                    return <TreeNode title={item.label + ' label'} value={item.value} key={item.value}>{loop(item.children)}</TreeNode>;
                }
                return <TreeNode title={item.label + ' label'} value={item.value} key={item.value} isLeaf={item.isLeaf} />;
            })
        };
        const treeNodes = loop(this.state.treeData);
        console.log('11111111111111', this.state);
        console.log('22222222222222', this.props);

        return (
            <div className="container-fluid">
                <Row>
                    <Col style={{ height : '48px', lineHeight : '48px'}}>
                        <SearchInput placeholder="请输入村的地理位置信息" style={{ width : '290px'}} update={this.updateKeywordSearch} search={this.commonSearch} />

                        <Button onClick={this.showModal} style={{marginLeft : '20px'}} type="primary" icon="plus">添加村</Button>
                    </Col>
                    <Col>
                        <Modal title={'添加乡村空店'} visible={visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                            <Form horizontal>
                                <FormItem {...formItemLayout} hasFeedback label="选择一个村">
                                    {getFieldDecorator('product_name', {
                                        rules : [
                                            {required : true, whitespace : true, message : '必填项'}
                                        ]
                                    })(
                                          <TreeSelect onSelect={this.onSelect} loadData={this.onLoadData} treeNodeFilterProp="title" showSearch >
                                              {treeNodes}
                                          </TreeSelect>

                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} hasFeedback label="第一书记手机号">
                                    {getFieldDecorator('village_info_id', {
                                        rules : [{ required : true, message : '必填项', whitespace : true }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
        )
    }
});

VillageContainer = createForm()(VillageContainer);

const mapStateToProps = function (store) {
    return {
        villageList : store.appInteractionState.villages.info,
        search : store.appInteractionState.villageSearch,
        page : store.appInteractionState.villagePageSearch,
        other : store.appInteractionState.villages,
        provinces : store.appInteractionState.provinces
    }
};

export default connect(mapStateToProps)(VillageContainer);

function generateTreeNodes(treeNode) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({ name : `leaf ${key}-${i}`, key : `${key}-${i}`});
    }
    return arr;
}

function setLeaf(treeData, curKey, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0){
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
    setLeaf(treeData, curKey, level);
}