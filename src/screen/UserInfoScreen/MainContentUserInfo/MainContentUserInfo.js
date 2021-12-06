// import React, { Component } from 'react';    
import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MainContentUserInfo.css';
import UserAPI from '../../../api/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setStateUserInfo } from '../../../redux/action/index';
import { stateLogin } from '../../../redux/action/index';

import { useTranslation } from "react-i18next";

function MainContentUserInfo() {

    const userInfo1 = useSelector((state) => state.setStateUserInfo.userInfo)
    const [userInfo, setUserInfo] = useState(userInfo1);
    console.log(userInfo);
    const history = useHistory();
    const dispatch = useDispatch();

    const { t } = useTranslation();

    async function getData() {
        let UserInforesult = await UserAPI.getUserInfo(localStorage.getItem('sessionId'));
        // UserInforesult.then(res => {
        const data = UserInforesult.data.data;
        setUserInfo(data);
        const isLogin = true;
       
        dispatch(stateLogin(isLogin));
        dispatch(setStateUserInfo(data));
        // });
    }

    useEffect(() => {

        getData();

        // const UserInforesult = await UserAPI.getUserInfo(localStorage.getItem('sessionId'));
        // UserInforesult.then(res => {
        //     const data = res.data.data;
        //     // setUserInfo(data);
        //     const isLogin = true;

        //     dispatch(stateLogin(isLogin));
        //     dispatch(setStateUserInfo(data));
        //     // if(!data) history.replace('/login');
        // },

        // );

        //  dispatch(setStateUserInfo(UserInforesult));

    }, [history]);
    return (
        <div className="content">
            <div className="notification">
                <p className="head-content">{t("noti")}</p>
                <div className="text-noti">
                    <span>{userInfo?.notification}</span>
                </div>
            </div>
            <div className="user-info">
                <p className="head-content">{t("userInfomation")}</p>

                <div className="content-user-info content-user-info-2">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="pro-user-info">{t("idUser")} </span>
                            <span className="value-user-info">{userInfo?.userId}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="pro-user-info">{t("contractor")}</span>
                            <span className="value-user-info">{userInfo?.userName}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="pro-user-info"> {t("userLever")}</span>
                            <span className="value-user-info">{userInfo?.tenantName}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="pro-user-info">{t("numbOfContracs")}</span>
                            <span className="value-user-info">{userInfo?.contractAmount} sheets</span>
                        </li>
                        <li className="list-group-item">
                            <span className="pro-user-info">{t("useMonth")}</span>
                            <span className="value-user-info">{userInfo?.useAmount} sheets</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default MainContentUserInfo;