import { ConfigProvider, Empty, Button } from "antd";
import zhCN from "./assets/shared/antd-zh.js";
import { AppProvider, useApp } from "./src/context.jsx";
import { breadcrumbItems } from "./src/mock/network.js";
import TopNav from "./src/components/top-nav/index.jsx";
import WizardStepper from "./src/components/wizard-stepper/index.jsx";
import FooterBar from "./src/components/footer-bar/index.jsx";
import NetworkPlanning from "./src/views/network-planning/index.jsx";
import RegionConfig from "./src/views/region-config/index.jsx";
import "./app.css";

function Breadcrumb() {
  return (
    <div className="app-breadcrumb-bar">
      <div className="breadcrumb">
        {breadcrumbItems.map((item, i) => (
          <span key={item} className="breadcrumb-item-wrap">
            {i > 0 && <span className="breadcrumb-sep">/</span>}
            <span
              className={
                "breadcrumb-item" +
                (i === breadcrumbItems.length - 1 ? " current" : "")
              }
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PageContent() {
  const { currentStep, goNext, goPrev } = useApp();

  return (
    <>
      <main className="app-main">
        <div className="app-card">
          <WizardStepper />
          {currentStep === 1 && <NetworkPlanning />}
          {currentStep === 2 && <RegionConfig />}
        </div>
      </main>
      <FooterBar>
        {currentStep === 1 && <Button size="small">取消</Button>}
        {currentStep === 2 && (
          <Button size="small">删除</Button>
        )}
        {currentStep > 1 && (
          <Button size="small" onClick={goPrev}>
            上一步
          </Button>
        )}
        <Button type="primary" size="small" onClick={goNext}>
          下一步
        </Button>
      </FooterBar>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ConfigProvider
        locale={zhCN}
        wave={{ disabled: true }}
        renderEmpty={() => <Empty />}
        empty={{ image: "./assets/uploads/empty.svg" }}
        spin={{
          indicator: (
            <img
              src="./assets/uploads/loading.svg"
              alt=""
              className="custom-spin-indicator"
            />
          ),
        }}
      >
        <div className="app-root">
          <TopNav />
          <Breadcrumb />
          <PageContent />
        </div>
      </ConfigProvider>
    </AppProvider>
  );
}
