import { Steps } from "antd";
import { wizardSteps } from "../../mock/network.js";
import { useApp } from "../../context.jsx";
import "./index.css";

export default function WizardStepper() {
  const { currentStep, setCurrentStep } = useApp();
  return (
    <Steps
      className="wizard-steps"
      size="small"
      current={currentStep - 1}
      onChange={(idx) => {
        // 仅允许点击返回到已完成的步骤；向前推进走底部"下一步"按钮
        if (idx < currentStep - 1) {
          setCurrentStep(idx + 1);
        }
      }}
      items={wizardSteps}
    />
  );
}
