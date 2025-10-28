import axios from 'axios';

const API_KEY = '52967670-3351bf06a7f07a2e608e7cced';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40; // скільки зображень на сторінку

export async function getImagesByQuery(query, page = 1) {
  try {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page: page,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Помилка при запиті до Pixabay API:', error);
    throw error;
  }
}
