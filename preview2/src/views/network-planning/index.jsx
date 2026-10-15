import { useState, useEffect } from "react";
import {
  Segmented,
  InputNumber,
  Input,
  Select,
  Switch,
  Tabs,
  Table,
  Button,
  Tooltip,
  Empty,
} from "antd";
import { Icon } from "../../../assets/shared/icon.jsx";
import InfoBanner from "../../components/info-banner/index.jsx";
import CollapseSection from "../../components/collapse-section/index.jsx";
import DynamicInputRow from "../../components/dynamic-input-row/index.jsx";
import SouthProtocolModal from "../../components/south-protocol-modal/index.jsx";
import {
  planningTypes,
  managementOptions,
  networkShapeOptions,
  ipPoolTabs,
  ipPoolDataMap,
} from "../../mock/network.js";
import "./index.css";

export default function NetworkPlanning() {
  const [planningType, setPlanningType] = useState("classic");
  const [spineCount, setSpineCount] = useState(2);
  const [leafCount, setLeafCount] = useState(6);
  const [ipPlanningOn, setIpPlanningOn] = useState(false);
  const [activeIpTab, setActiveIpTab] = useState("interconnect");
  const [modalOpen, setModalOpen] = useState(false);
  const [southConfigured, setSouthConfigured] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const isClassic = planningType === "classic";

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [activeIpTab]);

  const currentIpPoolData = ipPoolDataMap[activeIpTab] || [];
  const hasIpPoolData = currentIpPoolData.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const ipPoolColumns = [
    { title: "开始IP", dataIndex: "startIp", key: "startIp" },
    { title: "结束IP", dataIndex: "endIp", key: "endIp" },
    { title: "掩码", dataIndex: "mask", key: "mask" },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => <a className="cell-link">删除</a>,
    },
  ];

  return (
    <div className="network-planning">
      <div className="np-banner-area">
        <InfoBanner type="info">
          网络规划 &amp; 区域配置全部完成提交后，任务创建成功。网络规划数据不做单独保存，请退出前完成区域配置提交。
        </InfoBanner>
      </div>

      <CollapseSection title="拓扑规划">
        <div className="form-row">
          <label className="form-label required">拓扑规划</label>
          <Segmented
            options={planningTypes}
            value={planningType}
            onChange={(v) => setPlanningType(v)}
            size="small"
          />
        </div>

        {isClassic ? (
          <div className="classic-fields">
            <div className="form-row">
              <label className="form-label required">Spine数量</label>
              <InputNumber
                mode="spinner"
                variant="outlined"
                value={spineCount}
                onChange={(v) => setSpineCount(v || 0)}
                min={0}
                size="small"
                style={{ width: "6rem" }}
              />
            </div>
            <div className="form-row">
              <label className="form-label required">Leaf数量</label>
              <InputNumber
                mode="spinner"
                variant="outlined"
                value={leafCount}
                onChange={(v) => setLeafCount(v || 0)}
                min={0}
                size="small"
                style={{ width: "6rem" }}
              />
            </div>
            <div className="form-row">
              <label className="form-label required">Spine设备ESN</label>
              <DynamicInputRow
                initialValues={["SDFWSEFV44200000"]}
                placeholder="ESN"
              />
            </div>
            <div className="form-row">
              <label className="form-label required">组网管理方式</label>
              <Select
                options={managementOptions}
                defaultValue="outband"
                size="small"
                style={{ width: "16.25rem" }}
              />
            </div>
          </div>
        ) : (
          <div className="custom-fields">
            <div className="form-row">
              <label className="form-label">下载模板</label>
              <a className="np-template-link">
                <Icon name="file-spreadsheet" size="1rem" color="var(--success)" />
                模板.xlsx
              </a>
            </div>
            <div className="form-row">
              <label className="form-label">导入规划文件</label>
              <div className="np-import-group">
                <Input
                  defaultValue="Source001"
                  readOnly
                  size="small"
                  style={{ width: "18rem" }}
                />
                <Button size="small">导入</Button>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label required">组网管理方式</label>
              <Select
                options={managementOptions}
                defaultValue="outband"
                size="small"
                style={{ width: "16.25rem" }}
              />
            </div>
          </div>
        )}
      </CollapseSection>

      <CollapseSection title="IP规划">
        {!isClassic && (
          <div className="form-row">
            <Tooltip title="精细规划IP地址">
              <label className="form-label required">精细规划IP地址</label>
            </Tooltip>
            <Switch
              checked={ipPlanningOn}
              onChange={(v) => setIpPlanningOn(v)}
              size="small"
            />
          </div>
        )}

        {!ipPlanningOn && (
          <div className="ip-planning-content">
            <Tabs
              items={ipPoolTabs}
              activeKey={activeIpTab}
              onChange={(k) => setActiveIpTab(k)}
              size="small"
              className="ip-pool-tabs"
            />

            <div className="ip-pool-toolbar">
              <span className="ip-pool-desc">
                控制器交换机允许使用的BD范围，支持通过资源池实例管理这些BD资源，实现控制器自动配置BD，从而简化网络部署。
              </span>
              <div className="ip-pool-actions">
                {hasIpPoolData && selectedRowKeys.length > 0 && (
                  <span className="ip-pool-selected">
                    已选 {selectedRowKeys.length} 项
                  </span>
                )}
                {hasIpPoolData && <Button size="small">删除</Button>}
                <Button type="primary" size="small">
                  添加
                </Button>
              </div>
            </div>

            <div className="ip-pool-table">
              {hasIpPoolData ? (
                <Table
                  columns={ipPoolColumns}
                  dataSource={currentIpPoolData}
                  rowKey="id"
                  rowSelection={rowSelection}
                  size="large"
                  pagination={false}
                  locale={{ emptyText: <Empty description="暂无数据" /> }}
                />
              ) : (
                <div className="ip-pool-empty">
                  <Empty description="暂无数据" />
                </div>
              )}
            </div>
          </div>
        )}
      </CollapseSection>

      {isClassic && (
        <CollapseSection title="组网形态">
          <div className="form-row">
            <label className="form-label required">Leaf组网形态</label>
            <Select
              options={networkShapeOptions}
              defaultValue="mlag"
              size="small"
              style={{ width: "16.25rem" }}
            />
          </div>
          <div className="form-row">
            <label className="form-label required">CEV3 leaf</label>
            <Switch defaultChecked size="small" />
          </div>
          <div className="form-row">
            <label className="form-label required">DFS-Group密码</label>
            <Input
              placeholder="请输入内容"
              size="small"
              style={{ width: "17.5rem" }}
            />
          </div>
          <div className="form-row">
            <label className="form-label required">Spine上行口范围</label>
            <DynamicInputRow
              initialValues={["10GE1/0/0~10GE1/0/6"]}
              placeholder="10GE1/0/0~10GE1/0/6"
            />
          </div>
          <div className="form-row">
            <label className="form-label required">Spine下行口范围</label>
            <DynamicInputRow
              initialValues={["10GE1/0/0~10GE1/0/6"]}
              placeholder="10GE1/0/0~10GE1/0/6"
            />
          </div>
          <div className="form-row">
            <label className="form-label required">Leaf-Peer-link口范围</label>
            <DynamicInputRow
              initialValues={["10GE1/0/0~10GE1/0/6"]}
              placeholder="10GE1/0/0~10GE1/0/6"
            />
          </div>
        </CollapseSection>
      )}

      <CollapseSection title="全局配置">
        <div className="form-row">
          <label className="form-label required">配置南向协议</label>
          <Button
            size="small"
            onClick={() => setModalOpen(true)}
          >
            {southConfigured ? "查看" : "编辑"}
          </Button>
          <div className="np-global-tip">
            <Icon name="info" size="1rem" color="var(--primary)" />
            <span>
              {southConfigured
                ? "南向协议参数（Netconf、SNMP）为全局属性，当前已配置，可查看并进行配置。"
                : "南向协议参数（Netconf、SNMP）为全局属性，仅需配置一次。"}
            </span>
          </div>
        </div>
      </CollapseSection>

      <SouthProtocolModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setSouthConfigured(true);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
