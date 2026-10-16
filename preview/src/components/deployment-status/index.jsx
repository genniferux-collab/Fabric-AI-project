import { useState } from "react";
import InfoBanner from "../info-banner/index.jsx";
import "./index.css";

const deployStages = [
  "初始化资源池",
  "启动DHCP和SFTP服务器",
  "生成模板与脚本",
  "启动极简部署",
  "部署完成",
];

/* 36% overall progress => stage 1 done, stage 2 in progress */
const DONE_STAGE_COUNT = 2;

export default function DeploymentStatus() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="deployment-status">
      <InfoBanner type="info" icon="circle-alert">
        1、若部署中某台设备的进度一直未达到100%，可手动单击"完成"，结束流程，在设备侧清理执行的极简部署任务，处理报错后重新启动。上线失败，请参考
        <a>在线帮助</a>
        <a
          className="dep-more-link"
          onClick={() => setShowMore((v) => !v)}
        >
          {showMore ? "收起" : "更多"}
        </a>
        {showMore && (
          <div className="dep-more-tips">
            <p>
              2、待上线MLAG设备组的上行端口范围需保持一致，以及设备组件peerlink需保持一致，否则可能导致设备上线失败或互联配置及peerlink口配置下发失败。
            </p>
            <p>
              3、使用内置DHCP服务时，请确保组网环境中无其它DHCP服务器，否则设备可能会上线失败。
            </p>
            <p>4、对多层级设备ZTP上线，由于设备避退算法，推荐逐层对设备上电。</p>
          </div>
        )}
      </InfoBanner>

      <div className="dep-panel">
        <div className="dep-panel-top">
          <div className="dep-rate">
            <span className="dep-rate-value">
              <span className="dep-rate-num">36</span>
              <span className="dep-rate-unit">%</span>
            </span>
            <span className="dep-rate-label">部署进度</span>
          </div>
          <div className="dep-stats">
            <div className="dep-stat">
              <span className="dep-stat-num">0</span>
              <span className="dep-stat-item">
                <span className="dep-dot dep-dot-success" />
                <span className="dep-stat-text success">成功</span>
              </span>
            </div>
            <div className="dep-stat">
              <span className="dep-stat-num">0</span>
              <span className="dep-stat-item">
                <span className="dep-dot dep-dot-error" />
                <span className="dep-stat-text error">失败</span>
              </span>
            </div>
            <div className="dep-stat">
              <span className="dep-stat-num">8</span>
              <span className="dep-stat-item">
                <span className="dep-dot dep-dot-progress" />
                <span className="dep-stat-text progress">部署中</span>
              </span>
            </div>
          </div>
        </div>

        <div className="dep-steps">
          {deployStages.map((label, i) => (
            <div className="dep-step" key={label}>
              <div
                className={
                  "dep-step-bar" + (i < DONE_STAGE_COUNT ? " done" : "")
                }
              />
              <div className="dep-step-label" title={label}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
