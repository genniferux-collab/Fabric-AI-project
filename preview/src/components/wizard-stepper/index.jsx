import { Icon } from "../../../assets/shared/icon.jsx";
import { wizardSteps } from "../../mock/network.js";
import { useApp } from "../../context.jsx";
import "./index.css";

export default function WizardStepper() {
  const { currentStep } = useApp();

  return (
    <div className="stepper">
      {wizardSteps.map((step, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const stateClass = isDone
          ? " done"
          : isActive
          ? " active"
          : " inactive";

        return (
          <div className="step-item" key={step.title}>
            {idx > 0 && (
              <div
                className={
                  "step-connector" + (stepNum <= currentStep ? " done" : "")
                }
              />
            )}
            <div className={"step-circle" + stateClass}>
              {isDone ? (
                <Icon name="check" size="0.75rem" color="var(--success)" strokeWidth={3} />
              ) : (
                stepNum
              )}
            </div>
            <span className={"step-label" + stateClass}>{step.title}</span>
          </div>
        );
      })}
    </div>
  );
}
