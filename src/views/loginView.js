import { login } from "../api/api.js";
import { html } from "../lib.js";


let loginTemplate = (loginSubmit) => html`
        <section id="loginPage">
            <form @submit="${loginSubmit}">
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;


export function showLogin(ctx) {
    ctx.render(loginTemplate(loginSubmit));

    async function loginSubmit(ev) {
        ev.preventDefault();
        let allData = new FormData(ev.target);
        let email = allData.get("email");
        let password = allData.get("password");

        if(email != "" && password != "") {
        await login(email, password);
        ctx.navigation();
        ctx.page.redirect("/");
        }else {
            alert("All fields are required!");
        }
    }
}