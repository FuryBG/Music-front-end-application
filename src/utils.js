function getUserInfo() {
    let userData = sessionStorage.getItem("userData");
    return JSON.parse(userData);
}

function setUserInfo(infoObj) {
    sessionStorage.setItem("userData", JSON.stringify(infoObj));
}
function clearUserInfo() {
    sessionStorage.removeItem("userData");
}

export {
    getUserInfo,
    setUserInfo,
    clearUserInfo,
}