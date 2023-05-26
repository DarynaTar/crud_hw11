import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
    form: document.querySelector('.search-form'),
    searchFormButtonSubmit: document.querySelector('.search-form__submit'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
  };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34532945-6dd9e50d65c600f2d5972702b';

async function fetchImages(value, page = 1, perPage = 40) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a href="${largeImageURL}">
              <img
              class="gallery__image img"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`
    )
    .join('');
}

export function renderGalleryMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
}