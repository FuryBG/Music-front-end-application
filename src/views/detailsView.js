import { del, get } from "../api/api.js";
import { html } from "../lib.js";
import { getUserInfo } from "../utils.js";



let detailsTemplate = (data, ifOwner, deleter) => html`
<section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${data.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${data.name}</h1>
                        <h3>Artist: ${data.artist}</h3>
                        <h4>Genre: ${data.genre}</h4>
                        <h4>Price: $${data.price}</h4>
                        <h4>Date: ${data.releaseDate}</h4>
                        <p>Description: ${data.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${ifOwner ? html`
                    <div class="actionBtn">
                        <a href="/edit/${data._id}" class="edit">Edit</a>
                        <a @click="${deleter}" href="javascript:void(0)" class="remove">Delete</a>
                    </div>`: null}

                </div>
            </div>
        </section>`;


export function showDetails(ctx) {


    loadDetails();

    async function loadDetails() {
        let data = await get(`/data/albums/${ctx.params.id}`);

        let userData = getUserInfo();
        if(userData) {
            let ifOwner = userData.id == data._ownerId;
            ctx.render(detailsTemplate(data, ifOwner, deleter));
        }else {
            ctx.render(detailsTemplate(data, false, deleter));
        }

        async function deleter() {
            console.log(ctx.params.id);
            let ifTrue = confirm("Are u sure?");
            if(ifTrue) {
            try {
            await del(`/data/albums/${ctx.params.id}`);
            ctx.page.redirect("/catalog");
            }catch(err) {
                alert(err.message);
            }
        }
        };
    };


}