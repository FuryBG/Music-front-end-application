import { get } from "../api/api.js";
import { html } from "../lib.js";
import { getUserInfo } from "../utils.js";



let catalogTemplate = (result) => html`
<section id="catalogPage">
            <h1>All Albums</h1>
            ${result ? result : html`<p>No Albums in Catalog!</p>`}
            <!--No albums in catalog-->
        </section>`;


let itemTemplate = (data, userData) => html`
            <div class="card-box">
                <img src="${data.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${data.name}</p>
                        <p class="artist">Artist: ${data.artist}</p>
                        <p class="genre">Genre: Pop ${data.genre}</p>
                        <p class="price">Price: $${data.price}</p>
                        <p class="date">Release Date: ${data.releaseDate}</p>
                    </div>
                    ${userData ? html`
                    <div class="btn-group">
                        <a href="/details/${data._id}" id="details">Details</a>
                    </div>` : null}

                </div>
            </div>`;


export function showCatalog(ctx) {

    loadCatalog();

    async function loadCatalog() {
        let data = await get("/data/albums?sortBy=_createdOn%20desc&distinct=name");

        let userData = (getUserInfo() != null);

        console.log(data);
        if(data.length > 0) {
            ctx.render(catalogTemplate(data.map(x => itemTemplate(x, userData))));
        }else {
            ctx.render(catalogTemplate(undefined));
        }
    };
}