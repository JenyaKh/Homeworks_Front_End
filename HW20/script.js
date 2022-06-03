$(() => {
    const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums/'
    const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos/'
    const ALBUM_BOX_SELECTOR = '.albumBox';
    const ALBUM_TEMPLATE = $('#albumTemplate').html();
    const PHOTO_TEMPLATE = $('#photoTemplate').html();
  
    const $photosList = $('#photosList');
    const $albumsList = $('#albumsList').on('click', ALBUM_BOX_SELECTOR, onAlbumsListClick);
   

    const albumsApi = new RestApi(ALBUMS_URL);
    const photosApi = new RestApi(PHOTOS_URL);
   
    let albumsList = [];
    let photosList = [];


    init();

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
        $albumsList.html(albumsList.map(generateAlbumHtml).join('\n'));
    }

    function generateAlbumHtml(album) {
        return interpolate(ALBUM_TEMPLATE, album);
    }

    function interpolate(template, obj) {
        for (key in obj) {
            template = template.replaceAll(`{{${key}}}`, obj[key]);
        }
        return template;
    }

    function fetchPhotos(albumId) {
        photosApi.getList({ albumId }).then((photos) => {
            photosList = photos;
            renderPhotosList();
        })
    }

    function renderPhotosList() {
        $photosList.html(photosList.map(generatePhotoHtml).join('\n'));
    }

    function generatePhotoHtml(photo) {
        return interpolate(PHOTO_TEMPLATE, photo);
    }

    function onAlbumsListClick(e) {
        const album = e.target;
        const id = getAlbumId(album); 
        fetchPhotos(id);

    }

    function getAlbumId(el) {
        const $el = $(el);
        const $albumRow = $el.closest(ALBUM_BOX_SELECTOR);

        return $albumRow.data('albumId');
    }

});
