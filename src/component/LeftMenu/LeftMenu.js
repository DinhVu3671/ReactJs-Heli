import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './LeftMenu.css';
import { BsList, BsArrowRepeat } from "react-icons/bs";
import { FaUserCircle, FaUserAlt, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";


function LeftMenu() {

  const userInfo = useSelector((state) => state.setStateUserInfo.userInfo)
  const { t } = useTranslation();

  return (
    <div className="Left-menu">
      <div className="firs-LM">
        <FaUserCircle className="logo-firs-LM" size={40} color="gray" />
        <h6 className="text-firs-LM">{userInfo?.userName}</h6>
      </div>
      <div className="second-LM">
        <NavLink to="/user-info" className="navlink">
          <FaUserAlt className="logo-second-LM" size={18} color="gray" />
          <span className="text-LM">{t("userInfo")}</span>
        </NavLink>
      </div>
      <div className="second-LM"  >
        <NavLink to="/user-management" className="navlink" >
          <FaUsers className="logo-thirt-LM" size={18} color="gray" />
          <span className="text-LM">{t("userMana")}</span>
        </NavLink>
      </div>
    </div>
  )
}
export default LeftMenu;