import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "../components/footer";
import Header from "../components/header";
import Modal from "../container/modal/addNftModal";

import Dashboard from "../container/dashboard";
import Pagenotfound from "../container/pageNotFound";
import ScrollToTop from "../components/scroll";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Router>
      {/* <Header/>
    <Dashboard/>
    <Modal/>
    <Footer/> */}
    </>
  );
};

export default AppRoutes;
