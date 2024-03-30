import React from "react";
import { Layout, Breadcrumb, theme } from "antd";
import "./App.css";

import { SearchProps } from "antd/es/input";
import AppLayout from "./components/AppLayout";

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return <AppLayout onSearch={onSearch} />;
};

export default App;
