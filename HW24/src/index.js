import ImagePreview from './ImagePreview';
import RestApi from './RestApi';
import './styles.css';
import './ImagePreview.css';

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

const ALBUM_ITEM_CLASS = 'album-item';
const PHOTO_ITEM_CLASS = 'photo-item';

const albumsEl = document.querySelector('#albums');
const photosEl = document.querySelector('#photos');

const albumItemTemplate =
    document.querySelector('#albumItemTemplate').innerHTML;
const photoItemTemplate =
    document.querySelector('#photoItemTemplate').innerHTML;

const albumsApi = new RestApi(ALBUMS_URL);
const photosApi = new RestApi(PHOTOS_URL);
const preview = new ImagePreview();

albumsEl.addEventListener('click', onAlbumsElClick);
photosEl.addEventListener('click', onPhotosElClick);

init();

function onAlbumsElClick(e) {
    if (e.target.classList.contains(ALBUM_ITEM_CLASS)) {
        const id = getAlbumId(e.target);

        fetchPhotosList(id);
    };
};

function onPhotosElClick(e) {
    if (e.target.classList.contains(PHOTO_ITEM_CLASS)) {
        const url = getPhotoUrl(e.target);

        preview.show(url);
    };
};

function init() {
    fetchAlbumsList().then((albumsList) => fetchPhotosList(albumsList[0].id));
};

function fetchAlbumsList() {
    return albumsApi.getList().then(renderAlbumsList);
};

function renderAlbumsList(albumsList) {
    albumsEl.innerHTML = albumsList.map(renderAlbumsItem).join('');

    return albumsList;
};

function renderAlbumsItem(album) {
    return interpolate(albumItemTemplate, album);
};

function getAlbumId(el) {
    return el.dataset.id;
};

function fetchPhotosList(albumId) {
    return photosApi.getList({ albumId }).then(renderPhotosList);
};

function renderPhotosList(photosList) {
    photosEl.innerHTML = photosList.map(renderPhotosItem).join('');

    return photosList;
};

function renderPhotosItem(photo) {
    return interpolate(photoItemTemplate, photo);
};

function getPhotoUrl(el) {
    return el.dataset.url;
};

function interpolate(template, obj) {
    let key;
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    };

    return template;
};