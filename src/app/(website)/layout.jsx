import Footer from "@/component/footer/Footer";
import Header from "@/component/header/Header";
import React from "react";

export default function WebsiteLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}
