import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserInfo } from "./utils.js";
import { showCatalog } from "./views/catalogView.js";
import { showCreate } from "./views/createView.js";
import { showDetails } from "./views/detailsView.js";
import { showEdit } from "./views/editView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showRegister } from "./views/registerView.js";
import { showSearch } from "./views/searchView.js";

let container = document.getElementById("main-content");

page(decorate);
page.redirect("/");

page("/", showHome);
page("/catalog", showCatalog);
page("/login", showLogin);
page("/register", showRegister);
page("/search", showSearch);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);

page.start();
navigaton();


function decorate(ctx, next) {
    ctx.render = (view) => render(view, container);
    ctx.navigation = navigaton;
    next();
}

function navigaton() {
    let userData = getUserInfo();
    let allButtons = document.querySelectorAll("nav li");

    if(userData) {
        allButtons[2].style.display = "none";
        allButtons[3].style.display = "none";
        allButtons[4].style.display = "inline-block";
        allButtons[5].style.display = "inline-block";
    }else {
        allButtons[2].style.display = "inline-block";
        allButtons[3].style.display = "inline-block";
        allButtons[4].style.display = "none";
        allButtons[5].style.display = "none";
    }
};

document.querySelectorAll("nav a")[6].addEventListener("click", () => {
    logout();
    page.redirect("/");
    navigaton();
});