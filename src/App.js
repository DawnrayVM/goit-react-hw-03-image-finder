import { Component } from 'react';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Searchbar from './Components/Searchbar';
import pixabayAPI from './services/image-finder-api';
import Button from './Components/Button';
import ImageGallery from './Components/ImageGallery';

class App extends Component {
    state = {
        images: [],
        query: '',
        activeImageIdx: '',
        activeModal: false,
        loading: false,
    };

    queryHandler = (wordToFind, page) => {
        this.setState({ query: wordToFind });
    };

    getImages = () => {
        pixabayAPI
            .fetchImages(this.state.query)
            .then(hits => {
                if (hits.length > 0) {
                    const filteredData = hits.map(
                        ({ id, webformatURL, largeImageURL, tags }) => ({
                            id,
                            webformatURL,
                            largeImageURL,
                            tags,
                        }),
                    );
                    this.setState({ images: [...filteredData] });
                } else {
                    this.setState({ images: [] });
                    //PLACE FOR RENDER NO IMAGES FOUND
                }
                this.spinnerToggle();
            })
            .catch(error => console.log('this is an error', error))
            .finally(this.spinnerToggle());
    };

    spinnerToggle = () => {
        this.setState(prevState => ({ loading: !prevState.loading }));
    };

    submitHandler = e => {
        e.preventDefault();

        this.state.query ? this.getImages() : this.setState({ images: [] });
    };

    modalToggle = () => {
        this.setState(prevState => ({ activeModal: !prevState.activeModal }));
    };

    activeImageIdxHandler = e => {
        console.dir(e.target.dataset.src);
        this.setState({ activeImageIdx: e.target.dataset.src });
        this.modalToggle();
    };

    render() {
        const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
        `;
        return (
            <div className="App">
                <Searchbar
                    query={this.queryHandler}
                    onSubmit={this.submitHandler}
                />
                <PropagateLoader
                    css={override}
                    size={20}
                    color={'#3f51b5'}
                    loading={this.state.loading}
                />
                <ImageGallery
                    images={this.state.images}
                    getImageIdx={this.activeImageIdxHandler}
                >
                    <Button />
                </ImageGallery>
            </div>
        );
    }
}

export default App;
