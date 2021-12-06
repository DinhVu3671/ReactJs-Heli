import React, { Component, useEffect, useState } from 'react';
import ReactTable from "react-table";
import './MainUserMn.css';
c
import UserAPI from '../../../api/userAPI';
import CreatedForm from '../CreatedForm/CreatedForm';
import { useDispatch, useSelector } from "react-redux";
import Tables from "../Tables/Tables";
import changeTime from '../ChangeTime/ChangeTime';

import { setStateUserInfo, setUserData, setStatePagingTable } from '../../../redux/action/index';
import { stateLogin } from '../../../redux/action/index';

import { useTranslation } from "react-i18next";

import { CSVLink } from "react-csv";


function MainUserMn() {
    let paging = useSelector((state) => state.setStatePaging.paging);
    const userInfo = useSelector((state) => state.setStateUserInfo.userInfo);
    const isLogin = useSelector((state) => state.stateLogin.isLogin)
    // data table
    const dataTest = useSelector((state) => state.setUserData.userData);
    const dispatch = useDispatch();
    const history = useHistory();

    const { t, i18n } = useTranslation();


    async function testLoad(paging) {
        let result = UserAPI.getAllUsers(localStorage.getItem('sessionId'), paging.page, paging.size, paging.sortKey, paging.sortDir);
        result.then(res => {
            const data = res.data.data.elements;
            let usermana = data.map((value) => {
                value.createdAt = changeTime(value.createdAt);
                value.updatedAt = changeTime(value.updatedAt);
                return value;
            });
            dispatch(setStatePagingTable(res.data.data.paging));
            dispatch(setUserData(usermana));
        });
        return true;
    }
    useEffect(() => {
        async function getData() {
            const result = await testLoad(paging);
            if (!result) history.replace('/login');
        }
        getData();

        let UserInforesult = UserAPI.getUserInfo(localStorage.getItem('sessionId'));
        UserInforesult.then(res => {
            const data = res.data.data;
            const isLogin = true;
            dispatch(stateLogin(isLogin));
            dispatch(setStateUserInfo(data));
        });
        // if(!isLogin) history.replace('/login'); 
    }, [history]);

    const [delUserId, setDelUserId] = useState("");

    async function deleteUser() {
        try {
            await UserAPI.deleteUser(localStorage.getItem('sessionId'), delUserId);
            return true;
        }
        catch (err) {
            console.log(err);
        }
    }

    function getAddModal() {
        window.$('#add-user-modal').modal('show');
    }
    function getDeleteModal(e) {
        setDelUserId(e.target.getAttribute('data-user-id'));
        window.$('#delete-modal').modal('show');
    }
    async function deleteUserConfirm() {
        try {
            const delUser = await deleteUser();
            if (delUser === true) {
                await testLoad(paging);
                window.$('#delete-modal').modal('hide');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    // columns
    const columns = [
        {
            Header: `${t("stt")}`,
            width: '7%',
            iconSort: true,
            Cell: (cell) => <span>{cell.row.index + 1 + paging.size * (paging.page - 1)}</span>
        },
        {
            Header: `${t("idUser")}`,
            width: '27%',
            accessor: 'userId'
        },
        {
            Header: `${t("userName")}`,
            width: '27%',
            accessor: 'userName'
        },
        {
            Header: `${t("createDate")}`,
            width: '15%',
            accessor: 'createdAt',
        },
        {
            Header: `${t("updateDate")}`,
            width: '15%',
            accessor: 'updatedAt'
        },
        {
            Header: `${t("remove")}`,
            width: '10%',
            iconSort: true,
            Cell: (cell) => <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delete-modal" data-user-id={cell.row.value}
                onClick={getDeleteModal}
            >{t("remove")}</button>
        }
    ]
    // download csv
    const headers = [
        { label: 'User ID', key: 'userId' },
        { label: 'User Name', key: 'userName' },
        { label: 'Create Date', key: 'createdAt' },
        { label: 'Update Date', key: 'updatedAt' },
    ];

    const csvReport = {
        filename: 'Report.csv',
        headers: headers,
        data: dataTest
    }
    return (
        <div className="content conten-management">
            <div className="use-mana">
                <p className="head-content">{t("userMana")}</p>
                <div className="body-content">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="pro-user-info">{t("contractor")}</span>
                            <span className="value-user-info">{userInfo?.userName}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="pro-user-info">{t("numbOfContracsAcc")}</span>
                            <span className="value-user-info">{userInfo?.contractAccount} {t("acc")}</span>
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

                    <div className="create-new-user">
                        <button type="button" className="btn btn-primary btnCreat" data-bs-toggle="modal" data-bs-target="#add-user-modal"
                            onClick={getAddModal}
                        >{t("createAcc")}</button>
                        <button type="button" className="btn btn-primary btn-down">
                            <CSVLink {...csvReport} className="down">{t("download")}</CSVLink>
                        </button>
                    </div>
                </div>
            </div>

            <CreatedForm />

            <div className="user-management-table content-user-management">
                <Tables columns={columns} data={dataTest} />
            </div>
            <div className="swicth-language">
                <div className="version">{t("version")} 1.0.0</div>
                <div className="chang-lang">
                    <button className="btn btn-lang" onClick={() => i18n.changeLanguage('en')}>English</button>
                    <button className="btn btn-lang" onClick={() => i18n.changeLanguage('vi')}>Tiếng Việt</button>
                </div>
            </div>

            <div className="modal confirm-modal" id="delete-modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-center">{t("deleteUser")} "{delUserId}"?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">{t("close")}</button>
                            <button type="button" className="btn btn-danger" onClick={deleteUserConfirm}>{t("delete")}</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MainUserMn;