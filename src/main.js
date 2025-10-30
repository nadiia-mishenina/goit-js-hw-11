import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 40;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function hideLoadMore() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMore() {
  loadMoreBtn.style.display = 'block';
}

async function onSearch(event) {
  event.preventDefault();

  currentQuery = input.value.trim();
  if (!currentQuery) {
    iziToast.warning({
      message: 'Введіть пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMore();
  currentPage = 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'За вашим запитом нічого не знайдено 😕',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (currentPage < totalPages) {
      showLoadMore();
    } else {
      iziToast.info({
        message: 'Більше результатів немає.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Помилка при завантаженні зображень!',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (currentPage >= totalPages) {
      hideLoadMore();
      iziToast.info({
        message: 'Більше результатів немає.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Помилка при завантаженні зображень!',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}
