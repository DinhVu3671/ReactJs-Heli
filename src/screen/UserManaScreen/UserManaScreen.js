
import React, { Component, useEffect } from 'react';
// import { useTable, useBlockLayout, useResizeColumns } from "react-table";

import Header from '../../component/Header/Header';
import LeftMenu from '../../component/LeftMenu/LeftMenu';
import Footer from '../../component/Footer/Footer';
import MainUserMn from './MainUserMn/MainUserMn';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';

function UserManaScreen() {

  const isLogin = useSelector((state) => state.stateLogin.isLogin)
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      history.replace("/login")
    }
  });

  return (
    <div className="UserManaScreen">
      <Header />
      <div className="main">
        <LeftMenu />
        <div className="right-ML" style={{ backgroundColor: "rgb(233, 233, 233)" }} >
          <MainUserMn className="content" />
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default UserManaScreen;