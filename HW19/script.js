$(() => {
    const STICKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/';
    const DELETE_BTN_CLASS = 'deleteBtn';
    const STICKER_SELECTOR = '.sticker';
    const TEXT_CLASS = 'text';
    const STICKER_TEMPLATE = $('#stickerTemplate').html();  
    const $addBtn = $('#addBtn');
    const $stickersBox = $('#stickersBox');

    const stickersApi = new RestApi(STICKERS_URL);

    let stickersList = [];

    $addBtn.on('click', onAddBtnClick);
    $stickersBox.on('click', '.' + DELETE_BTN_CLASS, onStickerDelete)
    $stickersBox.on('change', '.' + TEXT_CLASS, onStickerBoxChange)

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
        $stickersBox.html(stickersList.map(generateStickerHtml).join('\n'));
    }

    function generateStickerHtml(sticker) {
        return interpolate(STICKER_TEMPLATE, sticker);
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
        const sticker = {
            description: '',
        };

        stickersApi.create(sticker)
            .then((sticker) => {
            stickersList.push(sticker);
            renderSticker(sticker);
        });
    }

    function renderSticker(sticker) {
        $(getStickerHtml(sticker)).appendTo($stickersBox);
    }
       
    function getStickerHtml(sticker) {
        return STICKER_TEMPLATE
            .replace('{{id}}', sticker.id)
            .replace('{{description}}', sticker.description);
    }

    function onStickerDelete(e) {
        const id = getStickerId(e.target);
        removeSticker(id);
    }

    function getStickerId(el) {
        const $el = $(el);
        const $stickerEl = $el.closest(STICKER_SELECTOR);

        return $stickerEl.data('stickerId');
    }

    function removeSticker(id) {
        const index = getStickerIndex(id);
        const sticker = stickersList[index];
        stickersList = stickersList.filter((st) => st.id !== id);
        deleteStickerElement(id);

        stickersApi.delete(id).catch(() => {
            stickersList.splice(index, 0, sticker);
            renderStickersList();
        });
    }

    function deleteStickerElement(id) {
        const element = getStickerElement(id);

        element && element.remove();
    }

    function getStickerElement(id) {
        return $(`[data-sticker-id="${id}"]`);
    }

    function onStickerBoxChange(e) {
        const id = getStickerId(e.target);
        updateSticker(id, e.target.value);
    }

    function updateSticker(id, value) {
        const index = getStickerIndex(id);
        const sticker = stickersList[index];
        sticker.description = value;

        stickersApi.update(sticker);
    }

    function getStickerIndex(id) {
        return  stickersList.findIndex((obj) => obj.id == id);
    }
});