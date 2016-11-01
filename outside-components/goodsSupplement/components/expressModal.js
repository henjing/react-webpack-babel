var React = require('react');
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


var DeliverModal = React.createClass({
    getInitialState : function () {
        return {
            consignee : '',
            record_sn : '',
            address : '',
            mobile : '',
            express_sn : '',
            express_company : ''
        }
    },
    handleClick : function () {
        if (this.props.type == 'deliver') {
            this.props.post(this.state);
        }
    },
    componentWillReceiveProps : function (nextProps) {
        if (this.state.record_sn != nextProps.row.record_sn) {
            this.setState({
                consignee : nextProps.row.consignee,
                record_sn : nextProps.row.record_sn,
                address : nextProps.row.address,
                mobile : nextProps.row.mobile
            })
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
                  <div>
                      <p>收货人: {this.state.consignee}</p>
                      <p>{this.state.address}</p>
                      <p>{this.state.mobile}</p>
                  </div>
                  <div>
                      <span>物流公司</span>
                      <input ref="express_company" type="text"/>
                  </div>
                  <div>
                      <span>快递单号</span>
                      <input ref="express_sn" type="text"/>
                  </div>
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