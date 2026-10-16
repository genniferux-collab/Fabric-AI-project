import { Icon } from "../../../assets/shared/icon.jsx";
import WizardStepper from "../wizard-stepper/index.jsx";
import "./index.css";

export default function SecondaryNav() {
  return (
    <div className="subnav-bar">
      <div className="subnav-inner">
        <button className="subnav-back" title="返回">
          <Icon name="arrow-left" size="1rem" color="var(--on-surface)" />
          <span>新极简开局任务</span>
        </button>
        <div className="subnav-stepper">
          <WizardStepper />
        </div>
      </div>
    </div>
  );
}
