import React from 'react';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message, Cascader, TreeSelect, Upload, Icon, DatePicker } from 'antd';
import store from '../../store';
import { connect } from 'react-redux';
import { getJieSuanInfoFromVillage, addJieSuanInfoToVillage, deleteTuHuoJieSuanPicture } from '../../api/cashier-api';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import { bankUpload } from '../../appConstants/urlConfig';

/*bugFix*/
import { jiesuanSelectStyle } from '../../appConstants/bugFix.js';

let TuHuoJieSuanContainer = React.createClass({
    getInitialState() {
        return {
            village_info_id: '',
            total_money: '',
            store_time: '',
            introduce: '',
            isVisible: false,
            dataSource: [],
            pictureReset: 0,
            fileListLength: 0,
            currentPage: 1,
            totalRows: 1,
            pageSize: 1
        }
    },
    componentWillUnmount() {
        this.setState(this.getInitialState());
    },
    componentDidMount() {
        if(this.props.villageList.length > 0) {
            let manualTrickSelectOption = this.props.villageList[0].id;
            this.handleSelect(manualTrickSelectOption);
        }
    },
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps.villageList);
        if(this.props.villageList.length === 0 && nextProps.villageList.length > 0) {
            console.log('this will only appear ones.');
            let manualTrickSelectOption = nextProps.villageList[0].id;
            this.handleSelect(manualTrickSelectOption);
        }
    },
    total_money(rule, value, callback) {
        try {
            if(/^\d+(\.\d{1,2})?$/.test(String(value))) {
                callback();
            } else {
                callback(['最多两位小数点'])
            }
        } catch (e) {
            callback([]);
        }
    },
    handleSelect(value) {
        this.setState({village_info_id: value}, function () {
            this.updateBank();
        }.bind(this));
    },
    updateBank(page) {
        getJieSuanInfoFromVillage({village_info_id: this.state.village_info_id, page: page ? page : ''}, function (info) {
            this.setState({dataSource: info.info, currentPage: info.current_page, pageSize: info.list_rows, totalRows: info.total_rows});
        }.bind(this), function (info) {
            this.setState({dataSource: [], currentPage: 1, totalRows: 1, pageSize: 1});
        }.bind(this));
    },
    onPageChange(page) {
        this.updateBank(page);
    },
    handleSubmit(e) {
        if(e) e.preventDefault();

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return;
            } else if(this.state.fileListLength == 0 || !values.store_time) {
                message.error('请上传结算凭证并选择结算日期！');
                return;
            } else {
                console.log('values', values);
                // window.v = values.store_time;
                addJieSuanInfoToVillage(this.assembleBankInfo(values), function (info) {
                    message.success(info.info);
                    this.hideModal();
                    this.updateBank();
                }.bind(this), function (info) {
                    message.error(info.info);
                }.bind(this))
            }
        });
    },
    getFileListLength(length) {
        this.setState({fileListLength : length});
    },
    assembleBankInfo(values) {
        values.store_time = values.store_time.toISOString().slice(0, 10);
        // v.toISOString().slice(0, 10);
        return Object.assign({}, {...values}, {village_info_id: this.state.village_info_id});
    },
    hideModal() {
        this.props.form.resetFields(['total_money', 'introduce']);
        try {
            document.getElementsByClassName('ant-calendar-picker-clear')[0].click();
        } catch (e) {}
        setTimeout(function () {
            this.setState({isVisible: false, pictureReset: Math.random()});
        }.bind(this), 10);
    },
    openModal() {
        if(this.state.village_info_id) {
            this.setState({isVisible: true});
        } else {
            message.error('请先选择要添加的村！');
        }
    },
    getColumns() {
        return [{title: '结算总价(元)', dataIndex: 'total_money', key: 'total_money'},
            {title: '交易清单', dataIndex: 'inbound_pictures', key: 'inbound_pictures', render: (text, record, index) => {
            let imgList = record.inbound_pictures.map(function (option) {
                return (
                    <span>
                        <a href={'/village/img_viewer?src=' + option} target="_blank"><img key={option} style={{width:120, height: 80}} src={option}/></a> &nbsp;
                    </span>
                )
            });
            return (
                <span>
                    {imgList}
                </span>
            )
            }},
            {title: '交易时间', dataIndex: 'store_time', key: 'store_time'},
            {title: '备注', dataIndex: 'introduce', key: 'introduce'},
            {title: '申请时间', dataIndex: 'add_time', key: 'add_time'},
            {title: '结算状态', dataIndex: 'pay_status', key: 'pay_status'},
            {title: '结算时间', dataIndex: 'pay_time', key: 'pay_time'}];
    },
    render() {
        let selectOptions = this.props.villageList.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 13}
        };

        const pagination = {current: this.state.currentPage, pageSize: this.state.pageSize, total: this.state.totalRows, onChange: this.onPageChange};

        return (
            <div>
                <Row style={{paddingLeft : '15px'}}>
                    <Col style={{ paddingBottom : '8px', paddingTop : '8px'}}>
                        <span style={{display:'inline-block', width:'66px'}}>所在村查询:</span>
                        <Select
                            showSearch
                            style={jiesuanSelectStyle}
                            onSelect={this.handleSelect}
                            value={this.state.village_info_id}
                            notFoundContent="没有可选择的内容"
                            placeholder="查看村的结算信息"
                            optionFilterProp="children"
                            key="select">
                            {selectOptions}
                        </Select>
                        &nbsp;&nbsp;
                        <Button type="primary" onClick={this.openModal}>添加结算信息</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table pagination={pagination} columns={this.getColumns()} dataSource={this.state.dataSource} />
                    </Col>
                </Row>
                <Modal title={'收款账户'} visible={this.state.isVisible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                            <Form horizontal>
                                <FormItem {...formItemLayout} hasFeedback label="结算总价(元)">
                                    {getFieldDecorator('total_money', {
                                        rules : [{ required : true, message : '请输入总价', whitespace : true }, { validator : this.total_money}]
                                    })(
                                        <Input type="number" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="交易日期">
                                    {getFieldDecorator('store_time', {

                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="备注说明">
                                    {getFieldDecorator('introduce', {

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="交易清单">
                                        <PicturesWall setFileListLength={this.getFileListLength}  pictureReset={this.state.pictureReset} />
                                </FormItem>
                            </Form>
                </Modal>
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        villageList : store.villageState.info,
        admin : store.navbarLayoutState.info.super
    }
};

TuHuoJieSuanContainer = createForm()(TuHuoJieSuanContainer);

export default connect(mapStateToProps)(TuHuoJieSuanContainer);

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    uploadUrl: '',
    previewImage: '',
    fileList: []
  };

  handleCancel = () => {
      this.setState({ previewVisible: false });
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  componentDidMount = () => this.setState({uploadUrl: bankUpload + '?number=' + new Date().getTime()});

  componentWillUnmount() {
      this.setState({
        previewVisible: false,
        uploadUrl: '',
        previewImage: '',
        fileList: []
      });
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.pictureReset !== nextProps.pictureReset) {
          this.setState({fileList: []});
      }
  }

  handleChange = ({ file, fileList }) => {
      let finalFileList = this.filterFileList(fileList);
      if (this.state.fileList.length !== finalFileList.length) {
          console.log('弹出提示');
          message.error('请上传正确的图片格式！');
      }
      this.setState({ fileList: finalFileList });
      console.log('fileList', fileList);
      // console.log('file', file);
      this.props.setFileListLength(finalFileList.length);
  };

  filterFileList(fileList) {
      let myIndex = -1;
      fileList.forEach(function (file, index) {
          if (file.status === 'done' && file.response.status === 0) {
              myIndex = index;
          }
      });
      if (myIndex === -1) {
          return fileList;
      } else {
          fileList.splice(myIndex, 1);
          return fileList;
      }
  }

  onRemove = (file) => {
      console.log('file', file);
      let toRemovedPicPath = file.response.info;

      if(toRemovedPicPath) {
          deleteTuHuoJieSuanPicture({pic_path: toRemovedPicPath}, function (info) {
              console.log(info.info);
          }.bind(this), function (info) {
              console.log(info.info);
          }.bind(this));
      }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.state.uploadUrl}
          listType="picture-card"
          fileList={fileList}
          multiple={true}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
          accept="image/*"
        >
          {uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
