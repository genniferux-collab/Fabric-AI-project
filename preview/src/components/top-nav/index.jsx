import { Icon } from "../../../assets/shared/icon.jsx";
import { navItems } from "../../mock/network.js";
import { useApp } from "../../context.jsx";
import "./index.css";

export default function TopNav() {
  const { isDark, toggleDark } = useApp();
  return (
    <header className="topnav">
      <div className="topnav-inner">
        <div className="topnav-left">
          <button className="topnav-icon-btn" title="菜单">
            <Icon name="menu" size="1.25rem" color="var(--on-surface)" />
          </button>
          <div className="topnav-brand">
            <span className="topnav-logo">
              <Icon name="network" size="1.75rem" color="var(--primary)" />
            </span>
            <span className="topnav-product">iMaster NCE-Fabric</span>
            <span className="topnav-divider">|</span>
            <span className="topnav-module">网络规建</span>
          </div>
        </div>
        <nav className="topnav-links">
          {navItems.map((item, i) => (
            <a
              key={item}
              href="#"
              className={"topnav-link" + (i === 1 ? " active" : "")}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="topnav-right">
          <button className="topnav-icon-btn" title="换肤" onClick={toggleDark}>
            <Icon
              name={isDark ? "sun" : "moon"}
              size="1.125rem"
              color="var(--on-surface-variant)"
            />
          </button>
          <button className="topnav-icon-btn" title="搜索">
            <Icon name="search" size="1.125rem" color="var(--on-surface-variant)" />
          </button>
          <button className="topnav-icon-btn" title="告警">
            <Icon name="bell" size="1.125rem" color="var(--on-surface-variant)" />
          </button>
          <span className="topnav-user">Admin</span>
          <div className="topnav-avatar">A</div>
        </div>
      </div>
    </header>
  );
}
