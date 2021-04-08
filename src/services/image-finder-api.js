import axios from 'axios';

const options = {
    url: 'https://pixabay.com/api/',
    perPage: 12,
    key: '20341451-3d1090cbc297b1fd4b3b8fcd1',
};

const fetchImages = (query, page = 1) => {
    const { url, perPage, key } = options;
    return axios
        .get(
            `${url}?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
        )
        .then(({ data }) => data.hits);
};

export default { fetchImages };
