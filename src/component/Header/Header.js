import React, { Component } from 'react';    
import logo from '../../img/logo.png';
import './Header.css';
import { BsList } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import LoginAPI from '../../api/LoginAPI';
import { stateLogin } from '../../redux/action/index';

function Header() { 
  const dispatch = useDispatch(); 
  const history = useHistory();

  async function handleClickLogoff(){
    LoginAPI.logoff(localStorage.getItem('sessionId'));
    localStorage.clear();
    const isLogin = false;
    dispatch(stateLogin(isLogin));
    history.replace('/login')
  }

  const userInfo = useSelector((state) => state.setStateUserInfo.userInfo)
  
    return (  
          <div className="sum-header">
              <div className="header">  

                  <img src={logo} alt="logo" className="logo" />
                  <div className="header-tab">
                      <BsList className="bsList" size={35} />
                      <div className="dropdown">
                        <div className="userId-header-tab dropdown-toggle" id="user-detai" data-bs-toggle="dropdown" aria-expanded="false">
                          <FaUserCircle className="useIcon" size={35} />
                          <p className="userId-text">{userInfo?.userId}</p> 
                         </div>

                         <div className="user-detai-drop dropdown-menu" aria-labelledby="user-detai"  >
                            <FaUserCircle className="useIcon" size={50} />
                            <p className="text-user-detai">{userInfo?.userId}</p>
                            <p className="text-user-detai">{userInfo?.userName}</p>
                            <div className="button-user-detai">
                              <button className="changepw">Change Password</button>
                              <button className="signout" onClick={handleClickLogoff}>Sign out</button>
                          </div> 
                      </div>

                    </div>
                    
                  </div>
                </div> 
        
          </div>
            
    )  
   
}  
export default Header;