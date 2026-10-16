import { ConfigProvider, Empty, Button } from "antd";
import zhCN from "./assets/shared/antd-zh.js";
import { AppProvider, useApp } from "./src/context.jsx";
import TopNav from "./src/components/top-nav/index.jsx";
import SecondaryNav from "./src/components/secondary-nav/index.jsx";
import FooterBar from "./src/components/footer-bar/index.jsx";
import NetworkPlanning from "./src/views/network-planning/index.jsx";
import RegionConfig from "./src/views/region-config/index.jsx";
import DeviceSelection from "./src/views/device-selection/index.jsx";
import "./app.css";

function PageContent() {
  const { currentStep, goNext, goPrev } = useApp();

  if (currentStep >= 3) {
    return (
      <>
        <SecondaryNav />
        <DeviceSelection deployMode={currentStep === 4} />
      </>
    );
  }

  return (
    <>
      <SecondaryNav />
      <main className="app-main">
        <div className="app-card">
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
          <PageContent />
        </div>
      </ConfigProvider>
    </AppProvider>
  );
}
