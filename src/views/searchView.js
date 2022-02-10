import { get } from "../api/api.js";
import { html } from "../lib.js";
import { getUserInfo } from "../utils.js";



let searchTemplate = (loadSearch, data) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click="${loadSearch}" class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
            ${data ? data : html`<p class="no-result">No result.</p>`}

                <!--If there are no matches-->
            </div>
        </section>`;


let itemTemplate = (data, isOwner) => html`
                <div class="card-box">
                    <img src="${data.imgUrl}">
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${data.name}s</p>
                            <p class="artist">Artist: ${data.artist}</p>
                            <p class="genre">Genre: ${data.genre}</p>
                            <p class="price">Price: $${data.price}</p>
                            <p class="date">Release Date: ${data.releaseDate}</p>
                        </div>
                        ${isOwner ? html`
                        <div class="btn-group">
                            <a href="/details/${data._id}" id="details">Details</a>
                        </div>`: null}

                    </div>
                </div>`;


export function showSearch(ctx) {
    ctx.render(searchTemplate(loadSearch));


    async function loadSearch(ev) {
        ev.preventDefault();
        let info = document.getElementById("search-input");
        let data = await get(`/data/albums?where=name%20LIKE%20%22${info.value}%22`);
        if(data.length > 0) {
            ctx.render(searchTemplate(loadSearch, data.map(x => {
                let userData = getUserInfo();
                if(userData) {
                    let isOwner = (userData.id == x._ownerId);
                    return itemTemplate(x, isOwner);
                }else {
                    return itemTemplate(x, false);
                }
            })));
        }else {
            ctx.render(searchTemplate(loadSearch, undefined));
        }
 
    }
}