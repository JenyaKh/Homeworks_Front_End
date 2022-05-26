const STICKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/';
const DELETE_BTN_CLASS = 'deleteBtn';
const STICKER_SELECTOR = '.sticker';
const TEXT_CLASS = 'text';
const stickersListEl = document.getElementById('stickersBox');
const stickerTemplate = document.getElementById('stickerTemplate').innerHTML;
const addBtnEl = document.getElementById('addBtn');
const stickersBoxEl = document.getElementById('stickersBox');

const stickersApi = new RestApi(STICKERS_URL);

let stickersList = [];

addBtnEl.addEventListener('click', onAddBtnClick);
stickersBoxEl.addEventListener('click', onStickerBoxClick)
stickersBoxEl.addEventListener('change', onStickerBoxChange)

init()

function init() {
    fetchStickers();
}

function fetchStickers() {
    stickersApi.getList().then((stickers) => {
        stickersList = stickers;
        renderStickersList();
    })
}

function renderStickersList() {
    stickersListEl.innerHTML = stickersList.map(generateStickerHtml).join('\n');
}

function generateStickerHtml(sticker) {
    return interpolate(stickerTemplate, sticker);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }
    return template;
}

function onAddBtnClick() {
    addSticker();
}

function addSticker() {

    stickersApi.create().then((data) => {
        fetchStickers();
    });
}

function onStickerBoxClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const id = getStickerId(e.target);
        removeSticker(id);
    }
}

function getStickerId(el) {
    const stickerEl = el.closest(STICKER_SELECTOR);

    return stickerEl.dataset.stickerId;
}

function removeSticker(id) {
    const index = getStickerIndex(id);
    const sticker = stickersList[index];
    stickersList = stickersList.filter((st) => st.id !== id);
    renderStickersList();

    stickersApi.delete(id).catch(() => {
        stickersList.splice(index, 0, sticker);
        renderStickersList();
    });
}

function onStickerBoxChange(e) {
    if (e.target.classList.contains(TEXT_CLASS)) {
        const id = getStickerId(e.target);
        updateSticker(id, e.target.value);
    }
}

function updateSticker(id, value) {
    const index = getStickerIndex(id);
    const sticker = stickersList[index];
    sticker.description = value;

    stickersApi.update(sticker).then((data) => fetchStickers());
}

function getStickerIndex(id) {
    return  stickersList.findIndex((obj) => obj.id == id);
}