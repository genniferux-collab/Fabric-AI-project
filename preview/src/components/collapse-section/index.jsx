import { useState } from "react";
import { Icon } from "../../../assets/shared/icon.jsx";
import "./index.css";

export default function CollapseSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="collapse-section">
      <div
        className="collapse-header"
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
      >
        <Icon
          name={open ? "chevron-down" : "chevron-right"}
          size="1rem"
          color="var(--on-surface-variant)"
          className={"collapse-arrow" + (open ? "" : " collapsed")}
        />
        <span className="collapse-title">{title}</span>
      </div>
      {open && <div className="collapse-body">{children}</div>}
    </div>
  );
}
