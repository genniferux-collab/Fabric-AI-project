import { useState } from "react";
import { Input } from "antd";
import { Icon } from "../../../assets/shared/icon.jsx";
import "./index.css";

export default function DynamicInputRow({
  initialValues = [],
  placeholder = "",
  width = "17.5rem",
}) {
  const [values, setValues] = useState(
    initialValues.length > 0 ? [...initialValues] : [""]
  );

  const addRow = () => setValues((v) => [...v, ""]);
  const removeRow = (idx) =>
    setValues((v) => (v.length > 1 ? v.filter((_, i) => i !== idx) : v));
  const updateRow = (idx, val) =>
    setValues((v) => v.map((x, i) => (i === idx ? val : x)));

  return (
    <div className="esn-row">
      {values.map((val, idx) => (
        <div className="esn-input-group" key={idx}>
          <Input
            value={val}
            onChange={(e) => updateRow(idx, e.target.value)}
            placeholder={placeholder}
            style={{ width }}
            size="small"
          />
          <button
            className="btn-icon add"
            title="添加"
            onClick={addRow}
            type="button"
          >
            <Icon name="plus" size="0.875rem" color="var(--on-surface)" />
          </button>
          <button
            className={
              "btn-icon remove" + (values.length > 1 ? " visible" : "")
            }
            title="删除"
            onClick={() => removeRow(idx)}
            type="button"
          >
            <Icon name="minus" size="0.875rem" color="var(--on-surface)" />
          </button>
        </div>
      ))}
    </div>
  );
}
