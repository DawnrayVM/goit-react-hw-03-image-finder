import axios from 'axios';

const options = {
    url: 'https://pixabay.com/api/',
    page: 1,
    perPage: 12,
    key: '20341451-3d1090cbc297b1fd4b3b8fcd1',
};

const fetchImages = query => {
    const { url, page, perPage, key } = options;
    return axios
        .get(
            `${url}?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
        )
        .then(({ data }) => data.hits);
};

export default { fetchImages };
