import React, { useEffect, useState } from 'react';
import { stateLogin } from '../../redux/action/index';
import { useHistory } from 'react-router-dom';
import LoginAPI from '../../api/LoginAPI';
import './LoginScreen.css';
import { useDispatch, useSelector } from 'react-redux';



import { useTranslation } from "react-i18next";

function LoginScreen() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState("");

    const { t } = useTranslation();

    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('sessionId')) {
            history.replace("/user-info")
        }
    }, [])

    const dispatch = useDispatch();
    async function handleClickLogin() {
        let item = { userId, password };
        if (item.userId === "" || item.password === "") {
            const loginResultcopy = 'Please enter your mail address/password';
            setLoginResult(loginResultcopy);
        }
        else {
            let result = LoginAPI.login(item);
            result.then(res => {
                const data = res.data.data;
                const isLogincopy = true;
                localStorage.setItem('sessionId', data.sessionId);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);
                dispatch(stateLogin(isLogincopy));
                history.replace("/user-info");
            })
                .catch(function (err) {
                    if (err.response) {
                        const loginResultcopy = err.response.data.message;
                        setLoginResult(loginResultcopy);
                    }
                });
        }
    }
    return (
        <div className="login-page">
            <h1 className="col-sm-3 title">Heligate </h1>
            <div className="col-sm-4 offset-sm-4">
                <input type="email" placeholder={t("mail")}
                    id="email-login" name="userId"
                    onChange={(e) => setUserId(e.target.value)}
                    className="form-control" required />
                <br />
                <input type="password" placeholder={t("password")}
                    id="password-login"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control" required />
                <br />
                <p className="login-Result">{loginResult}</p>
                <button onClick={handleClickLogin} className="btn btn-primary title">{t("login")}</button>
            </div>
        </div>
    )
}
export default (LoginScreen)