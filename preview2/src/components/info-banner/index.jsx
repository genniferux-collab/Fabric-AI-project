import { Icon } from "../../../assets/shared/icon.jsx";
import "./index.css";

export default function InfoBanner({ type = "info", children }) {
  const iconName = type === "warning" ? "triangle-alert" : "info";
  const iconColor =
    type === "warning" ? "var(--critical)" : "var(--primary)";

  return (
    <div className={"info-banner " + type}>
      <span className="info-banner-icon" style={{ color: iconColor }}>
        <Icon name={iconName} size="1rem" />
      </span>
      <span className="info-banner-text">{children}</span>
    </div>
  );
}
