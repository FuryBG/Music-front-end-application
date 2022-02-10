import { clearUserInfo, getUserInfo, setUserInfo } from "../utils.js";



let host = "http://localhost:3030";

async function request(url, options) {
    try {
        let response = await fetch(host + url, options);

        if(response.ok != true) {
            if(response.status == 403) {
                clearUserInfo();
            }
            let error = await response.json();
            throw new Error(error.message);
        }
        if(response.status == 204) {
            return response;
        }
        else {
            return response.json();
        }
    }catch(err) {
        window.alert(err.message);
        throw err;
    }
}

function createOptions(method = "GET", data) {
    let options = {
        method,
        headers: {}
    };
    if(data != undefined) {
        options.headers["Content-Type"] = "applicaiton/json";
        options.body = JSON.stringify(data);
    }
    let userData = getUserInfo();

    if(userData != null) {
        options.headers["X-Authorization"] = userData.token;
    }

    return options;
}

async function get(url) {
    return request(url, createOptions());
};
async function post(url, data) {
    return request(url, createOptions("POST" ,data));
};
async function put(url, data) {
    return request(url, createOptions("PUT", data));
};
async function del(url) {
    request(url, createOptions("DELETE"));
};

async function login(email, password) {
    try {
    let result = await post("/users/login", {email, password});
    console.log(result);
    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken,
        gender: result.gender,
        password,
        username: result.username
    }
    setUserInfo(userData);
}catch(err) {
    throw new Error(err.message);
}
};

async function register(email, password, username, gender) {
    let result = await post("/users/register", {email, password, username, password});

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken,
        username,
        gender
    }
    setUserInfo(userData);
};

function logout() {
    let userData = getUserInfo();
    let token = userData.token;
    fetch("/users/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        }
    });
    clearUserInfo();
}




export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout
};