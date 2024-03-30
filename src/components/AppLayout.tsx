// AppLayout.tsx
import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";
import "./css/AppContent.css";
import type { AppLayoutProps } from "../types/types";

const AppLayout: React.FC<AppLayoutProps> = ({ onSearch }) => {
  return (
    <Layout>
      <AppHeader onSearch={onSearch} />
      <AppContent onSearch={onSearch} />
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
