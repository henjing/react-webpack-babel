var React = require('react');
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

var fetch = require('../helpers/fetch');
var getExpress = require('../constants/AppConstants').getExpress;
import Dropdown from 'react-dropdown';


var DeliverModal = React.createClass({
    getInitialState : function () {
        return {
            consignee : '',
            record_sn : '',
            address : '',
            mobile : '',
            express_sn : '',
            express_company : '',
            express_list : [],
            dropdown_default : ''
        }
    },
    componentDidMount : function () {
        fetch({}, getExpress, function (res) {
            if (res.status === 1) {
                this.setState({
                    dropdown_default : '',
                    express_list : res.info
                });
                console.log('status === 1', res);
            } else if (res.status === 0) {
                console.log('status === 0', res);
                this.setState({ dropdown_default : res.info});
            }
        }.bind(this), function (err) {
            console.error('获取快递公司列表失败', err);
            this.setState({dropdown_default : '服务器运行错误'});
        }.bind(this))
    },
    handleDropdown : function (option) {
        // console.log(option);
        this.setState({express_company : option.value});
    },
    handleClick : function () {
        if (this.props.type == 'deliver') {
            this.setState({
                express_sn : this.refs.express_sn.value, 
                // express_company : this.refs.express_company.value
            }, function () {
                console.log('setState后的回调', 'a', this.state);
                this.props.post(this.state);
            }.bind(this));

        } else {
            this.props.doClose();
        }
    },
    componentWillReceiveProps : function (nextProps) {
        if (this.state.record_sn != nextProps.row.record_sn) {
            this.setState({
                consignee : nextProps.row.consignee,
                record_sn : nextProps.row.record_sn,
                address : nextProps.row.address,
                mobile : nextProps.row.mobile
            });
            if (nextProps.type == 'display') {
                this.setState({
                    express_sn : nextProps.row.express_sn,
                    express_company : nextProps.row.express_company
                });
            }
        }

    },
    showInput : function () {
        if (this.props.type == 'deliver') {
            return (
                <div className="container-fluid">
                  <div className="row mb10">
                      <div className="col-sm-6 txt-al-r">物流公司</div>
                      <div className="col-sm-6 txt-al-l">
                          {/*<input ref="express_company" type="text"/>*/}
                          <div className="dropdownContainer">
                              <Dropdown
                              options={this.state.express_list}
                              onChange={this.handleDropdown}
                              />
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-sm-6 txt-al-r">快递单号</div>
                      <div className="col-sm-6 txt-al-l"><input ref="express_sn" type="text"/></div>
                  </div>
                </div>
            )
        } else if (this.props.type == 'display') {
            return (
                <div className="container-fluid">
                  <div className="row mb10">
                      <div className="col-sm-6 txt-al-r">物流公司</div>
                      <div className="col-sm-6 txt-al-l">{this.state.express_company}</div>
                  </div>
                  <div className="row">
                      <div className="col-sm-6 txt-al-r">快递单号</div>
                      <div className="col-sm-6 txt-al-l"><span>{this.state.express_sn}</span></div>
                  </div>
                </div>
            )
        }
    },
    render : function () {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.doClose} >
              <ModalHeader>
                <ModalClose onClick={this.props.doClose}/>
                <ModalTitle>{this.props.type == 'deliver' ? '发货' : '物流信息'}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                  <div className="kd-modal-body">
                      <p>收货人: {this.state.consignee}</p>
                      <p>{this.state.address}</p>
                      <p>{this.state.mobile}</p>
                  </div>
                  {this.showInput()}

              </ModalBody>
              <ModalFooter>
                <button className='btn btn-info' onClick={this.handleClick}>
                    {this.props.type === 'deliver' ? '确认发货' : '确认'}
                </button>
                <button className='btn btn-default'
                        onClick={this.props.doClose}
                >
                  取消
                </button>
              </ModalFooter>
            </Modal>
        )
    }
});

module.exports = DeliverModal;