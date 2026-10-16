export const navItems = ["概览", "部署", "资源池", "物理资源", "对接"];

export const wizardSteps = [
  { title: "网络规划" },
  { title: "区域配置" },
  { title: "选择设备" },
  { title: "设备上线" },
];

export const planningTypes = [
  { label: "经典配置规划", value: "classic" },
  { label: "自定义规划", value: "custom" },
];

export const managementOptions = [
  { label: "带外管理网", value: "outband" },
  { label: "带内管理网", value: "inband" },
];

export const networkShapeOptions = [
  { label: "M-LAG", value: "mlag" },
  { label: "VXLAN", value: "vxlan" },
];

export const ipPoolTabs = [
  { key: "interconnect", label: "互联IP池" },
  { key: "vtep", label: "Vtep IP池" },
  { key: "bgppeer", label: "BGP PEER IP池" },
  { key: "vtepmac", label: "Vtep MAC池" },
  { key: "staticroute", label: "静态路由" },
  { key: "vxlanbypass", label: "Vxlan-ByPass-IP池" },
];

export const ipPoolDataMap = {
  interconnect: [
    { id: 1, startIp: "192.168.1.10", endIp: "192.168.1.50", mask: "255.255.255.0" },
    { id: 2, startIp: "192.168.1.60", endIp: "192.168.1.100", mask: "255.255.255.0" },
    { id: 3, startIp: "10.1.1.10", endIp: "10.1.1.40", mask: "255.255.255.128" },
    { id: 4, startIp: "10.1.1.50", endIp: "10.1.1.80", mask: "255.255.255.128" },
    { id: 5, startIp: "172.16.0.10", endIp: "172.16.0.60", mask: "255.255.255.0" },
    { id: 6, startIp: "172.16.1.10", endIp: "172.16.1.60", mask: "255.255.255.0" },
  ],
  vtep: [],
  bgppeer: [
    { id: 1, startIp: "10.10.0.10", endIp: "10.10.0.20", mask: "255.255.255.252" },
    { id: 2, startIp: "10.10.0.30", endIp: "10.10.0.40", mask: "255.255.255.252" },
  ],
  vtepmac: [],
  staticroute: [],
  vxlanbypass: [],
};

export const fabricMgmtOptions = [
  { label: "新建", value: "new" },
  { label: "已有", value: "existing" },
  { label: "不绑定Fabric", value: "unbound" },
];

export const networkTypeOptions = [
  { label: "分布式", value: "distributed" },
  { label: "集中式", value: "centralized" },
];

export const underlayProtocolOptions = [
  { label: "OSPF", value: "ospf" },
  { label: "IS-IS", value: "isis" },
  { label: "BGP", value: "bgp" },
];

export const callhomeAuthOptions = [
  { label: "证书认证", value: "cert" },
  { label: "密码认证", value: "password" },
];

export const snmpAuthProtocolOptions = [
  { label: "HMAC_SHA2_256", value: "sha256" },
  { label: "HMAC_SHA1", value: "sha1" },
];

export const snmpEncryptOptions = [
  { label: "HMAC_SHA2_256", value: "sha256" },
  { label: "AES256", value: "aes256" },
];

export const headerToolIcons = [
  { name: "share-2", title: "网络拓扑" },
  { name: "search", title: "搜索" },
  { name: "circle-alert", title: "告警" },
  { name: "eye", title: "监控" },
  { name: "user", title: "用户" },
];
