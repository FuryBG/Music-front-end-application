import { get, put } from "../api/api.js";
import { html } from "../lib.js";



let editTemplate = (data, editSubmit) => html`
<section class="editPage">
            <form @submit="${editSubmit}">
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" .value="${data.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${data.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" .value="${data.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${data.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" .value="${data.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" .value="${data.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${data.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`;


export function showEdit(ctx) {

    loadEdit();

    async function loadEdit() {
        let data = await get(`/data/albums/${ctx.params.id}`);
        ctx.render(editTemplate(data, editSubmit));
    };

    async function editSubmit(ev) {
        ev.preventDefault();
        let allData = new FormData(ev.target);

        let name = allData.get("name");
        let imgUrl = allData.get("imgUrl");
        let price = allData.get("price");
        let releaseDate = allData.get("releaseDate");
        let artist = allData.get("artist");
        let genre = allData.get("genre");
        let description = allData.get("description");

        let allInfo = {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        };
        let filtered = Object.entries(allInfo).filter(x => x[1] == "");

        if(filtered.length > 0) {
            alert("All fields are required!");
        }else {
            await put(`/data/albums/${ctx.params.id}`, allInfo);
            ctx.page.redirect(`/details/${ctx.params.id}`);
        }
    }
}