import { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "antd";
import "./index.css";

const maskOptions = [
  { label: "255.255.255.0 (/24)", value: "255.255.255.0" },
  { label: "255.255.255.128 (/25)", value: "255.255.255.128" },
  { label: "255.255.255.192 (/26)", value: "255.255.255.192" },
  { label: "255.255.255.252 (/30)", value: "255.255.255.252" },
  { label: "255.255.255.254 (/31)", value: "255.255.255.254" },
  { label: "255.255.0.0 (/16)", value: "255.255.0.0" },
  { label: "255.0.0.0 (/8)", value: "255.0.0.0" },
];

export default function IpPoolModal({ open, onClose, onConfirm, tabLabel }) {
  const [startIp, setStartIp] = useState("");
  const [endIp, setEndIp] = useState("");
  const [mask, setMask] = useState("255.255.255.0");

  // 弹窗每次打开时重置表单
  useEffect(() => {
    if (open) {
      setStartIp("");
      setEndIp("");
      setMask("255.255.255.0");
    }
  }, [open]);

  const handleConfirm = () => {
    if (!startIp || !endIp) return;
    onConfirm({ startIp, endIp, mask });
  };

  const title = "添加" + (tabLabel ? tabLabel : "IP池");

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      centered
      width={480}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          确定
        </Button>,
      ]}
    >
      <div className="modal-body-inner">
        <div className="modal-form-row">
          <label className="modal-form-label required">开始IP</label>
          <Input
            className="modal-form-input"
            placeholder="请输入开始IP地址"
            size="small"
            value={startIp}
            onChange={(e) => setStartIp(e.target.value)}
          />
        </div>
        <div className="modal-form-row">
          <label className="modal-form-label required">结束IP</label>
          <Input
            className="modal-form-input"
            placeholder="请输入结束IP地址"
            size="small"
            value={endIp}
            onChange={(e) => setEndIp(e.target.value)}
          />
        </div>
        <div className="modal-form-row">
          <label className="modal-form-label required">掩码</label>
          <Select
            className="modal-form-input"
            options={maskOptions}
            size="small"
            value={mask}
            onChange={setMask}
          />
        </div>
      </div>
    </Modal>
  );
}
