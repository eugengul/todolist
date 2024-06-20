'use strict';

let accessToken = localStorage.getItem('accessToken');

const login = (loginData, callback) => {
    fetch("./auth/login", {
        method: "POST",
        body: loginData,
        headers: {
            "Content-type": "application/json",
        }
    })
        .then((response) => {
            if (response.status != 200) {
                return response.json().then(
                    response => { throw new Error(response.message) });
            } else {
                return response.json()
            }
        })
        .then(response => {
            if (response['accessToken']) {
                accessToken = response['accessToken'];
                localStorage.setItem('accessToken', accessToken);
                const user = response['user'];
                localStorage.setItem('username', user.username)
                callback();
            }
        }).catch(
            (err) => {
                console.warn(err);
                callback(err.message);
            });
}

const signUp = (signUpData, callback) => {
    fetch("./auth/signup", {
        method: "POST",
        body: signUpData,
        headers: {
            "Content-type": "application/json",
        }
    })
        .then((response) => {
            if (response.status != 200) {
                return response.json().then(
                    response => { throw new Error(response.message) });
            } else {
                return response.json()
            }
        })
        .then(response => {
            if (response['accessToken']) {
                accessToken = response['accessToken'];
                localStorage.setItem('accessToken', accessToken);
                const user = response['user'];
                localStorage.setItem('username', user.username)
                callback();
            }
        }).catch(
            (err) => {
                console.warn(err);
                callback(err.message);
            });
}

const userInfo = (callback) => {
    fetch("./auth/user", {
        method: "get",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then((response) => response.json())
        .then(response => {
            const user = response['user'];
            localStorage.setItem('username', user.username)
            callback()
        })
        .catch(console.warn);
}

const logout = () => {
    accessToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    updateAuthBlock();
    deleteAllTasks();
}

const auth = {
    login,
    signUp,
    logout,
    userInfo,

    get accessToken() {
        return accessToken;
    },
}