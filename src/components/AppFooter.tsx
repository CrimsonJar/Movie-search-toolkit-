import React from "react";

import { Footer } from "antd/es/layout/layout";

const AppFooter: React.FC = ({}) => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Подвал Design ©{new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
