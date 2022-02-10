import { register } from "../api/api.js";
import { html } from "../lib.js";


let registerTemplate = (registerSubmit) => html`
 <section id="registerPage">
            <form @submit="${registerSubmit}">
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;


export function showRegister(ctx) {
    ctx.render(registerTemplate(registerSubmit));

    async function registerSubmit(ev) {
        ev.preventDefault();
        let allData = new FormData(ev.target);
        let email = allData.get("email");
        let password = allData.get("password");
        let rePass = allData.get("conf-pass");

        if(email != "" && password != "" && rePass != "") {
            await register(email, password);
            ctx.navigation();
            ctx.page.redirect("/");
        }else {
            alert("All fields are required!");
        }
    }
};