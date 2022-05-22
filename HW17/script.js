const ALBUM_BOX_SELECTOR = '.albumBox';
const PHOTO_BOX_SELECTOR = '.photoBox';
const ALBUM_VIEWED_CLASS = 'viewed';

const albumsEl = document.getElementById('albums');
const photosEl = document.getElementById('photos');
const albumTemplate = document.getElementById('albumTemplate').innerHTML;
const albumsListEl = document.getElementById('albumsList');
const photoTemplate = document.getElementById('photoTemplate').innerHTML;
const photosListEl = document.getElementById('photosList');

albumsListEl.addEventListener('click', onAlbumsListClick);
photosListEl.addEventListener('click', onPhotosListClick);

const albumsApi = new RestApi(
    'https://jsonplaceholder.typicode.com/albums/',
);
const photosApi = new RestApi(
    'https://jsonplaceholder.typicode.com/photos/',
);
let modal = $modal();
let albumsList = [];
let photosList = [];

init()

function init() {
    fetchAlbums();
}

function fetchAlbums() {
    albumsApi.getList().then((albums) => {
        albumsList = albums;
        renderAlbumsList();
        fetchPhotos(albums[0].id);
    })
}

function renderAlbumsList() {
    albumsListEl.innerHTML = albumsList.map(generateAlbumHtml).join('\n');
}

function generateAlbumHtml(album) {
    return interpolate(albumTemplate, album);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }

    return template;
}

function fetchPhotos(idAlbum) {
    photosApi.getByParam('albumId', idAlbum).then((photos) => {
        photosList = photos;
        renderPhotosList();
    })
}

function renderPhotosList() {
    photosListEl.innerHTML = photosList.map(generatePhotoHtml).join('\n');
}

function generatePhotoHtml(photo) {
    return interpolate(photoTemplate, photo);
}

function onAlbumsListClick(e) {
    const album = e.target;
    const id = getAlbumId(album);
    markAlbumViewed(album);    
    fetchPhotos(id);

}

function markAlbumViewed(album) {
    album.classList.add(ALBUM_VIEWED_CLASS);
}

function getAlbumId(el) {
    const albumRowEl = el.closest(ALBUM_BOX_SELECTOR);

    return albumRowEl.dataset.albumId;
}

function onPhotosListClick(e) {
    const id = getPhotoId(e.target);
    const photo = getPhotoObj(id);
    showModal(photo);
}

function getPhotoId(el) {
    const photoRowEl = el.closest(PHOTO_BOX_SELECTOR);

    return photoRowEl.dataset.photoId;
}

function getPhotoObj(photoId) {
    const index = photosList.findIndex((obj) => obj.id == photoId);
    return photosList[index];
}

function showModal({url, title}) {

    modal.setContent(`<img src=${url}>`);
    modal.setTitle(title);
    modal.show();
}