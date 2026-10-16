import { useState } from "react";
import { Icon } from "../../../assets/shared/icon.jsx";
import "./index.css";

export default function CollapseSection({ title, children, defaultOpen = true, open, onToggle, className }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;

  const handleToggle = () => {
    if (onToggle) onToggle(!isOpen);
    else setInternalOpen((o) => !o);
  };

  return (
    <div className={"collapse-section" + (className ? " " + className : "")}>
      <div
        className="collapse-header"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
      >
        <Icon
          name={isOpen ? "chevron-down" : "chevron-right"}
          size="1rem"
          color="var(--on-surface-variant)"
          className={"collapse-arrow" + (isOpen ? "" : " collapsed")}
        />
        <span className="collapse-title">{title}</span>
      </div>
      {isOpen && <div className="collapse-body">{children}</div>}
    </div>
  );
}
