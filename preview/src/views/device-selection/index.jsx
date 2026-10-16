import { useState } from "react";
import { Tabs, Input, Button, Table, Modal, Tag } from "antd";
import { Icon } from "../../../assets/shared/icon.jsx";
import InfoBanner from "../../components/info-banner/index.jsx";
import DeploymentStatus from "../../components/deployment-status/index.jsx";
import { useApp } from "../../context.jsx";
import {
  deviceTabs,
  deviceSelectionList,
  unactivatedDevices,
} from "../../mock/network.js";
import "./index.css";

const deviceColumns = [
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 80,
    render: () => (
      <span className="ds-action-group">
        <Icon
          name="pencil"
          size="0.875rem"
          className="ds-action-icon"
          title="编辑"
        />
        <Icon
          name="trash-2"
          size="0.875rem"
          className="ds-action-icon"
          title="删除"
        />
      </span>
    ),
  },
  {
    title: "上线状态",
    dataIndex: "onlineStatus",
    key: "onlineStatus",
    width: 96,
    render: (text) => <Tag>{text}</Tag>,
  },
  {
    title: "设备名称",
    dataIndex: "deviceName",
    key: "deviceName",
    width: 140,
  },
  {
    title: "管理IPv4地址",
    dataIndex: "mgmtIpv4",
    key: "mgmtIpv4",
    width: 130,
  },
  {
    title: "设备角色",
    dataIndex: "deviceRole",
    key: "deviceRole",
    width: 96,
  },
  {
    title: "ZTP层级",
    dataIndex: "ztpLevel",
    key: "ztpLevel",
    width: 88,
  },
  {
    title: "VTEP IPv4",
    dataIndex: "vtepIpv4",
    key: "vtepIpv4",
    width: 120,
  },
  {
    title: "BGP Router ID",
    dataIndex: "bgpRouterId",
    key: "bgpRouterId",
    width: 116,
  },
  {
    title: "设备软件版本",
    dataIndex: "softwareVersion",
    key: "softwareVersion",
    width: 110,
  },
];

const modalDeviceColumns = [
  {
    title: "设备名称",
    dataIndex: "deviceName",
    key: "deviceName",
    width: 96,
  },
  {
    title: "设备角色",
    dataIndex: "deviceRole",
    key: "deviceRole",
    width: 88,
  },
  {
    title: "ZTP层级",
    dataIndex: "ztpLevel",
    key: "ztpLevel",
    width: 88,
  },
  {
    title: "设备序列号",
    dataIndex: "deviceSerial",
    key: "deviceSerial",
    width: 196,
  },
  {
    title: "设备位置",
    dataIndex: "deviceLocation",
    key: "deviceLocation",
    width: 132,
  },
  {
    title: "管理IPv4地址",
    dataIndex: "mgmtIpv4",
    key: "mgmtIpv4",
    width: 122,
  },
  {
    title: "VTEP IPv4",
    dataIndex: "vtepIpv4",
    key: "vtepIpv4",
    width: 106,
  },
  {
    title: "Bypass IPv4互联地址",
    dataIndex: "bypassIpv4",
    key: "bypassIpv4",
    width: 128,
  },
  {
    title: "Bypass IPv6互联地址",
    dataIndex: "bypassIpv6",
    key: "bypassIpv6",
    width: 128,
  },
  {
    title: "VxlanByPass IPv4",
    dataIndex: "vxlanBypassIpv4",
    key: "vxlanBypassIpv4",
    width: 112,
  },
  {
    title: "VTEP MAC",
    dataIndex: "vtepMac",
    key: "vtepMac",
    width: 180,
  },
  {
    title: "EBGP AS number",
    dataIndex: "ebgpAsNumber",
    key: "ebgpAsNumber",
    width: 140,
  },
  {
    title: "BGP Router ID",
    dataIndex: "bgpRouterId",
    key: "bgpRouterId",
    width: 134,
  },
  {
    title: "设备软件版本",
    dataIndex: "softwareVersion",
    key: "softwareVersion",
    width: 124,
  },
];

/* 3 pages × 10 rows: every page shows the same 10 devices */
const modalDeviceData = [
  ...deviceSelectionList,
  ...deviceSelectionList,
  ...deviceSelectionList,
].map((item, idx) => ({ ...item, id: idx + 1 }));

const confirmColumns = [
  {
    title: "设备名称",
    dataIndex: "deviceName",
    key: "deviceName",
  },
  {
    title: "设备ESN",
    dataIndex: "deviceEsn",
    key: "deviceEsn",
  },
  {
    title: "是否有激活码",
    dataIndex: "hasActivationCode",
    key: "hasActivationCode",
  },
];

export default function DeviceSelection({ deployMode = false }) {
  const { setCurrentStep } = useApp();
  const [activeTab, setActiveTab] = useState("device");
  const [keyword, setKeyword] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("device");
  const [modalKeyword, setModalKeyword] = useState("");
  const [modalSelectedRowKeys, setModalSelectedRowKeys] = useState([]);
  const [sidebarDevices, setSidebarDevices] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmOnlineModalOpen, setConfirmOnlineModalOpen] = useState(false);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const modalRowSelection = {
    selectedRowKeys: modalSelectedRowKeys,
    onChange: (keys) => setModalSelectedRowKeys(keys),
  };

  /* Confirm: carry the checked rows (deduped by serial) into the sidebar table */
  const handleModalConfirm = () => {
    const picked = modalDeviceData.filter((item) =>
      modalSelectedRowKeys.includes(item.id)
    );
    setSidebarDevices((prev) => {
      const existingSerials = new Set(prev.map((d) => d.deviceSerial));
      const merged = [...prev];
      picked.forEach((item) => {
        if (!existingSerials.has(item.deviceSerial)) {
          merged.push({ ...item, onlineStatus: "待上线" });
        }
      });
      return merged;
    });
    setModalSelectedRowKeys([]);
    setAddModalOpen(false);
  };

  return (
    <div className="device-selection">
      <div className="ds-canvas">
        <img
          className="ds-canvas-bg"
          src="./assets/uploads/background.jpg"
          alt=""
        />
      </div>
      <aside className="ds-sidebar">
        <div className="ds-sidebar-title">设备选择</div>
        {deployMode && <DeploymentStatus />}
        <Tabs
          items={deviceTabs}
          activeKey={activeTab}
          onChange={(k) => setActiveTab(k)}
          size="small"
          className="ds-tabs"
        />
        <div className="ds-toolbar">
          <Input
            size="small"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={() => {}}
            placeholder="请输入搜索内容"
            suffix={
              <Icon
                name="search"
                size="0.875rem"
                color="var(--on-surface-variant)"
              />
            }
          />
          <div className="ds-toolbar-actions">
            <Button size="small">删除</Button>
            <Button size="small">清空</Button>
            <Button type="primary" size="small" onClick={() => setAddModalOpen(true)}>
              添加
            </Button>
          </div>
        </div>
        <div className="ds-table">
          <Table
            columns={deviceColumns}
            dataSource={sidebarDevices}
            rowKey="id"
            rowSelection={rowSelection}
            size="large"
            pagination={false}
            scroll={{ x: 1008 }}
            locale={{
              emptyText: (
                <div className="ds-empty">
                  <img
                    className="ds-empty-img"
                    src="./assets/uploads/empty.svg"
                    alt=""
                  />
                  <div className="ds-empty-text">
                    暂无数据，请
                    <a
                      className="ds-empty-link"
                      onClick={() => setAddModalOpen(true)}
                    >
                      添加
                    </a>
                  </div>
                </div>
              ),
            }}
          />
        </div>
        <div className="ds-sidebar-footer">
          <Button size="small">删除</Button>
          <Button
            type="primary"
            size="small"
            disabled={sidebarDevices.length === 0}
            onClick={() => setConfirmModalOpen(true)}
          >
            开始上线
          </Button>
        </div>
      </aside>

      <Modal
        title="设备选择列表"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        width={1854}
        footer={[
          <Button key="cancel" onClick={() => setAddModalOpen(false)}>
            取消
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleModalConfirm}
          >
            确定
          </Button>,
        ]}
      >
        <div className="ds-modal-body">
          <div className="ds-modal-toolbar">
            <Tabs
              items={deviceTabs}
              activeKey={modalTab}
              onChange={(k) => setModalTab(k)}
              size="small"
              className="ds-modal-tabs"
            />
            <a className="ds-modal-export">
              <Icon name="download" size="0.875rem" />
              导出
            </a>
          </div>
          <Input
            size="small"
            allowClear
            className="ds-modal-search"
            value={modalKeyword}
            onChange={(e) => setModalKeyword(e.target.value)}
            onPressEnter={() => {}}
            placeholder="请输入搜索内容"
            suffix={
              <Icon
                name="search"
                size="0.875rem"
                color="var(--on-surface-variant)"
              />
            }
          />
          <Table
            columns={modalDeviceColumns}
            dataSource={modalDeviceData}
            rowKey="id"
            rowSelection={modalRowSelection}
            size="large"
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              showQuickJumper: { goButton: "跳转" },
              showTotal: (total) => (
                <span>
                  总计：{total}
                  <span className="ds-modal-selected-label">已选：</span>
                  <span className="ds-modal-selected-count">
                    {modalSelectedRowKeys.length}
                  </span>
                </span>
              ),
            }}
            scroll={{ x: 1806 }}
          />
        </div>
      </Modal>

      <Modal
        className="ds-confirm-modal"
        title={
          <span className="ds-confirm-title">
            <Icon
              name="circle-alert"
              size="1.25rem"
              color="var(--primary)"
            />
            信息提示
          </span>
        }
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        width={640}
        centered
        footer={[
          <Button key="cancel" onClick={() => setConfirmModalOpen(false)}>
            取消
          </Button>,
          <Button
            key="done"
            type="primary"
            onClick={() => {
              setConfirmModalOpen(false);
              setConfirmOnlineModalOpen(true);
            }}
          >
            已配置
          </Button>,
        ]}
      >
        <div className="ds-confirm-body">
          <InfoBanner type="warning">
            以下5个设备暂未配置配置激活码，请完成前置条件：
            <a>eSight中心&gt;设备管理&gt;激活码录入</a>
          </InfoBanner>
          <Table
            columns={confirmColumns}
            dataSource={unactivatedDevices}
            rowKey="id"
            size="large"
            pagination={false}
          />
        </div>
      </Modal>

      <Modal
        className="ds-online-modal"
        title="确认上线"
        open={confirmOnlineModalOpen}
        onCancel={() => setConfirmOnlineModalOpen(false)}
        width={640}
        centered
        footer={[
          <Button key="cancel" onClick={() => setConfirmOnlineModalOpen(false)}>
            取消
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => {
              setConfirmOnlineModalOpen(false);
              setCurrentStep(4);
            }}
          >
            确认
          </Button>,
        ]}
      >
        <div className="ds-online-body">
          <InfoBanner type="info" icon="circle-alert">
            上线前先检查相关设置，减少失败风险。
          </InfoBanner>
          <div className="ds-online-tips">
            <p>
              1.待上线MLAG设备组的上行<strong>端口范围需保持一致</strong>
              ，以及<strong>设备组件peerlink需保持一致</strong>
              ，否则可能导致设备上线失败或互联配置及peerlink口配置下发失败。
            </p>
            <p>
              2.<strong>使用内置DHCP服务</strong>
              时，请确保组网环境中无其它DHCP服务器，否则设备可能会上线失败。
            </p>
            <p>3.对多层级设备ZTP上线，由于设备避退算法，推荐逐层对设备上电。</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
