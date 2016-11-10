import React from 'react';
import { connect } from 'react-redux';
import { getVillageDetailList, getCities, getDistricts, getProvinces, getVillages, addVillage } from '../../api/app-interacton-api';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message, Cascader, TreeSelect } from 'antd';
import _ from 'lodash';
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import store from '../../store';
import { updateAppInteractionState } from '../../actions/app-actions';
import SearchInput from '../views/commonSearchInput';
const ajaxMap = {
    province : getCities,
    city : getDistricts,
    district : getVillages
};
let stringObj = {};

let VillageContainer = React.createClass({
    
    componentDidMount() {
        getVillageDetailList({});
        getProvinces({}, function (response) {
            this.setState({
                treeData : response.info.map(function (option) {
                  return {
                      value : option.id,
                      title : option.name,
                      tag : option.tag
                  }
                })
            })
        }.bind(this))
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
    onSelect(value, node, extra) {
        console.log('value', value, 'node', node, 'extra', extra);
        stringObj[node.props.tag] = node.props.title;
    },
    handleSubmit(e) {
        if(e) e.preventDefault();

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return ;
            } else {
                console.log('values', values);
                addVillage(assembleId(values), function (info) {
                    message.success(info.info);
                }.bind(this), function (info) {
                    message.error(info.info);
                }.bind(this))
            }
        });
    },
    cellphone(rule, value, callback) {
        try {
            if(/(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/.test(value) || !value) {
                callback();
            } else {
                callback(['请输入正确的手机号码']);
            }
        } catch (e) {
            callback(['请输入正确的手机号码'])
        }
    },
    selectVillage(rule, value, callback) {
        console.log('rule', rule, 'value', value);
        // callback();
        try {
            if(parseInt(value) < 1000) {
                callback(['请具体到某一个村']);
            } else if (parseInt(value) % 10000 === 0) {
                callback(['请具体到某一个村']);
            } else callback();

        } catch (e) { callback(['请具体到某一个村']); }
    },
    onLoadData(treeNode) {
        // console.log('treeNode', treeNode);
        const tag = treeNode.props.tag;
        const id = treeNode.props.value;
        const ajax = ajaxMap[tag];
        stringObj[tag] = treeNode.props.title;
        if (!(!!ajax)) {
            return new Promise((resolve, reject) => {
                resolve();
                // reject();
            })
        }
        return ajax({ id : id}, function (info) {
            const newTreeNodes = info.info.map(function (option) {
                return {
                    value : option.id,
                    title : option.name,
                    tag : option.tag
                }
            });
            const treeData = [...this.state.treeData];
            getNewTreeData(treeData, id, newTreeNodes);
            this.setState({treeData});
        }.bind(this));
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
                    return <TreeNode tag={item.tag} title={item.title} value={item.value} key={item.value} isLeaf={false}>{loop(item.children)}</TreeNode>;
                }
                // if (item.isLeaf) {
                //     return <TreeNode tag={item.tag} title={item.title} value={item.value} key={item.value} isLeaf={item.isLeaf} />;
                // }
                return <TreeNode tag={item.tag} title={item.title} value={item.value} key={item.value} isLeaf={item.isLeaf} />;
            })
        };
        const treeNodes = loop(this.state.treeData);
        // console.log('11111111111111', this.state);
        // console.log('22222222222222', this.props);

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
                                    {getFieldDecorator('id', {
                                        rules : [
                                            {required : true, whitespace : true, message : '请选择村'}, { validator : this.selectVillage}
                                        ]
                                    })(
                                          <TreeSelect onSelect={this.onSelect} showCheckedStrategy={TreeSelect.SHOW_ALL} dropdownStyle={{maxHeight : '900px', overflow : 'auto'}} loadData={this.onLoadData} treeNodeFilterProp="title" showSearch >
                                              {treeNodes}
                                          </TreeSelect>

                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} hasFeedback label="第一书记手机号">
                                    {getFieldDecorator('cellphone', {
                                        rules : [{ required : true, message : '请输入正确的手机号码', whitespace : true }, { validator : this.cellphone}]
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

function setLeaf(treeData, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child) {
    const loop = (data) => {
        data.forEach((item) => {
            if (curKey == item.value) {
                if (item.children) return;
                item.children = child;
            } else if (item.children) {
                loop(item.children)
            }
        });
    };

    loop(treeData);
    setLeaf(treeData, 4);
}

function assembleId(config) {
    const id = config.id;
    const province = id.slice(0, 3);
    const city = Math.floor(parseInt(id) / 10000000) * 10000000 + '';
    const district = Math.floor(parseInt(id) / 1000000) * 1000000 + '';
    // return {
    //     province : province,
    //     city : city,
    //     district : district,
    //     village : id,
    //     cellphone : config.cellphone
    // }
    stringObj.cellphone = config.cellphone;
    return stringObj;
}