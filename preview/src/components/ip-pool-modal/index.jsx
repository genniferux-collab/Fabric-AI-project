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

  const title = "添加" + (tabLabel || "IP池");

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      centered
      width={520}
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
      <div className="ip-modal-body">
        <div className="ip-modal-desc">
          请输入IP地址范围和子网掩码，添加到当前{tabLabel || "IP池"}中。
        </div>
        <div className="ip-modal-form-row">
          <label className="ip-modal-label required">开始IP</label>
          <Input
            className="ip-modal-input"
            placeholder="例如：192.168.1.10"
            size="small"
            value={startIp}
            onChange={(e) => setStartIp(e.target.value)}
          />
        </div>
        <div className="ip-modal-form-row">
          <label className="ip-modal-label required">结束IP</label>
          <Input
            className="ip-modal-input"
            placeholder="例如：192.168.1.100"
            size="small"
            value={endIp}
            onChange={(e) => setEndIp(e.target.value)}
          />
        </div>
        <div className="ip-modal-form-row">
          <label className="ip-modal-label required">掩码</label>
          <Select
            className="ip-modal-input"
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
