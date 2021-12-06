import { connect } from 'react-redux';

// import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import React, { Component, useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import LeftMenu from '../../component/LeftMenu/LeftMenu';
import MainContentUserInfo from './MainContentUserInfo/MainContentUserInfo';
import Footer from '../../component/Footer/Footer';
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";


function UserInfoScreen() {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      history.replace("/login")
    }
  });

  return (
    <div className="UserInfoScreen">
      <Header />
      <div className="main">
        <LeftMenu />
        <div className="right-ML" >
          <MainContentUserInfo className="content" />
          <Footer />
        </div>
      </div>

    </div>
  )

}


export default (UserInfoScreen);