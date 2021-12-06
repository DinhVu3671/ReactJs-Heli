import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserAPI from '../../../api/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setStatePagingTable, setUserData } from '../../../redux/action/index';
import changeTime from '../ChangeTime/ChangeTime';

import { useTranslation } from "react-i18next";



function CreatedForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [teamId, setTeamId] = useState(2306);
    const [languageSetting, setLanguageSetting] = useState(0);
    const [userStatus, setUserStatus] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createResult, setCreateResult] = useState("");

    const { t } = useTranslation();

    let paging = useSelector((state) => state.setStatePaging.paging);

    function SetManagement(page, size, sortKey, sortDir) {
        let result = UserAPI.getAllUsers(localStorage.getItem('sessionId'), page, size, sortKey, sortDir);
        result.then(res => {
            const data = res.data.data.elements;
            let usermana = data.map((value) => {
                value.createdAt = changeTime(value.createdAt);
                value.updatedAt = changeTime(value.updatedAt);
                return value;
            }
            );
            dispatch(setStatePagingTable(res.data.data.paging));
            dispatch(setUserData(usermana));
        });
    }

    function resetForm() {
        setUserId('');
        setUserName('');
        setLanguageSetting(0);
        setUserStatus(1);
        setPassword('');
        setConfirmPassword('');
        setCreateResult("");
    }

    async function CreateNewUser(data) {
        if (data.userId === "" || data.userName === "" || data.teamId === "" || data.password === "" || data.confirmPassword === "") {
            return "Enter all fields marked with *";
        }
        else if (data.password !== data.confirmPassword) {
            return "Password Confirm is not correct";
        }
        else {
            try {
                const responseResult = await UserAPI.createNewUser(localStorage.getItem('sessionId'), data);
                console.log(responseResult);
                if (responseResult.data.data.statusCode === 'USER_DELETED') {
                    return 'deleted';
                }
                return true;
            }
            catch (err) {
                return err.response.data.message;
            }
        }
    }
    async function addNewUser() {
        const createUserResult = await CreateNewUser({ userId, userName, teamId, languageSetting, userStatus, password, confirmPassword });
        console.log(createUserResult);
        if (createUserResult === 'deleted') {
            window.$('#add-confirm-modal').modal('hide');
            window.$('#re-create-confirm-modal').modal('show');
        }
        else if (createUserResult == true) {
            await SetManagement();
            window.$('#add-user-modal').modal('hide');
            resetForm();
        }
        else {
            setCreateResult(createUserResult);
        }
    }
    async function reCreateUser(data) {
        try {
            await UserAPI.createNewUser(localStorage.getItem('sessionId'), data, true);
            return true;
        }
        catch (err) {
            return err.response.data.message;
        }
    }
    async function reAddUser() {
        const reCreateUserResult = await reCreateUser({ userId, userName, teamId, languageSetting, userStatus, password, confirmPassword });
        if (reCreateUserResult === true) {
            await SetManagement();
            window.$('#re-create-confirm-modal').modal('hide');
            window.$('#add-user-modal').modal('hide');
            resetForm();
        }
        else {
            window.$('#re-create-confirm-modal').modal('hide');
            setCreateResult(reCreateUserResult);
        }
    }

    return (
        <React.Fragment>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="add-user-modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t("userMana")} [{t("accPage")}]</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div id="form">
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="userId-add" className="col-sm-3 col-form-label">{t("idUser")} <span style={{ color: 'red' }}>*</span></label>
                                        <div class="col-sm-9">
                                            <input type="email" className="form-control " id="userId-add" placeholder={t("placeId")}
                                                value={userId} onChange={(e) => setUserId(e.target.value)}
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="userName-add" className="col-sm-3 col-form-label">{t("userName")}<span style={{ color: 'red' }}>*</span></label>
                                        <div class="col-sm-9">
                                            <input type="text" className="form-control" id="userName-add" placeholder={t("userName")}
                                                value={userName} onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="teamName-add" className="col-sm-3 col-form-label">{t("teamName")}<span style={{ color: 'red' }}>*</span></label>
                                        <div class="col-sm-9">
                                            <select className="form-select "
                                                value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                                                <option value="2306">Team1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="language-add" className="col-sm-3 col-form-label">{t("lang")}<span style={{ color: 'red' }}>*</span></label>
                                        <div class="col-sm-9">
                                            <select className="form-select"
                                                value={languageSetting} onChange={(e) => setLanguageSetting(e.target.value)}>
                                                <option value="0">日本語</option>
                                                <option value="1">English</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="status-add" className="col-sm-3 col-form-label">{t("status")}<span style={{ color: 'red' }}>*</span></label>
                                        <div className="form-check form-switch col-sm-9" id="status-add">
                                            <input className="form-check-input " type="checkbox"
                                                defaultChecked={!userStatus} onChange={(e) => setUserStatus(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password-add" className="col-sm-3 col-form-label">{t("password")}<span style={{ color: 'red' }}>*</span></label>
                                        <div class="col-sm-9">
                                            <input type="password" className="form-control form-style" id="password-add" placeholder={t("password")}
                                                value={password} onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-3 col-form-label"></div>
                                        <div className="col-sm-9">{t("desPass1")} <br /> {t("desPass2")} </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password-confirm-add" className="col-sm-3 col-form-label">{t("passwordConf")}<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="password" className="form-control form-style" id="password-confirm-add" placeholder={t("passwordConf")}
                                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="create-result text-center text-danger">
                                    {createResult}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary " data-bs-toggle="modal"
                                data-bs-target="#add-confirm-modal"
                                onClick={addNewUser}
                            >{t("save")}</button>
                            <div className="col-sm-5 col-form-label"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal User Delete --> */}
            <div className="modal confirm-modal add-confirm-modal" id="re-create-confirm-modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-center">UserID has been deleted. Do you want re-create this UserID?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                            <button type="button" className="btn btn-success"
                                onClick={reAddUser}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default CreatedForm;