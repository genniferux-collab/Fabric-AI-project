import { useState } from "react";
import { Modal, Input, Select, Switch, Button } from "antd";
import {
  callhomeAuthOptions,
  snmpAuthProtocolOptions,
  snmpEncryptOptions,
} from "../../mock/network.js";
import "./index.css";

export default function SouthProtocolModal({ open, onClose, onConfirm }) {
  const [netconfOpen, setNetconfOpen] = useState(true);
  const [snmpOpen, setSnmpOpen] = useState(true);

  return (
    <Modal
      title="配置南向协议"
      open={open}
      onCancel={onClose}
      width={560}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          确定
        </Button>,
      ]}
    >
      <div className="modal-body-inner">
        <div
          className="modal-section-header"
          onClick={() => setNetconfOpen((o) => !o)}
          role="button"
          tabIndex={0}
        >
          <span className={"modal-section-arrow" + (netconfOpen ? "" : " collapsed")}>
            ▾
          </span>
          <span className="modal-section-title">Netconf账户</span>
        </div>
        {netconfOpen && (
          <div className="modal-section-body">
            <div className="modal-form-row">
              <label className="modal-form-label required">用户名</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">密码</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">转发器端口号</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">Callhome认证方式</label>
              <Select
                className="modal-form-input"
                options={callhomeAuthOptions}
                size="small"
                defaultValue="cert"
              />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">自定义证书模式</label>
              <Switch size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">设备证书ESN校验</label>
              <Switch size="small" defaultChecked />
            </div>
          </div>
        )}

        <div
          className="modal-section-header"
          onClick={() => setSnmpOpen((o) => !o)}
          role="button"
          tabIndex={0}
        >
          <span className={"modal-section-arrow" + (snmpOpen ? "" : " collapsed")}>
            ▾
          </span>
          <span className="modal-section-title">SNMP账户</span>
        </div>
        {snmpOpen && (
          <div className="modal-section-body">
            <div className="modal-form-row">
              <label className="modal-form-label required">用户名</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">端口</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">鉴定协议</label>
              <Select
                className="modal-form-input"
                options={snmpAuthProtocolOptions}
                size="small"
                defaultValue="sha256"
              />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">鉴权密钥</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">加密算法</label>
              <Select
                className="modal-form-input"
                options={snmpEncryptOptions}
                size="small"
                defaultValue="sha256"
              />
            </div>
            <div className="modal-form-row">
              <label className="modal-form-label required">加密密钥</label>
              <Input className="modal-form-input" placeholder="请输入" size="small" />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
