import React, { Component } from 'react';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';
import SearchBar from './Components/Searchbar';
import pixabayAPI from './services/image-finder-api';
import Button from './Components/Button';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';

class App extends Component {
    state = {
        images: [],
        searchQuery: '',
        page: 1,
        activeImage: '',
        activeModal: false,
        loading: false,
        scrollValue: 0,
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.images.length < this.state.images.length) {
            const list = document.querySelector('.App');
            return list.scrollHeight - list.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevState, prevProps, snapshot) {
        if (prevProps.searchQuery !== this.state.searchQuery) {
            this.findImages();
        }

        if (snapshot !== null) {
            window.scrollTo({
                top: snapshot - 105,
                behavior: 'smooth',
            });
        }
    }

    setDefaultState = () => {
        this.setState({
            images: [],
            searchQuery: '',
            page: 1,
            activeImage: '',
            activeModal: false,
            loading: false,
            scrollValue: 0,
        });
    };
    findImages = () => {
        pixabayAPI
            .fetchImages(this.state.searchQuery, this.state.page)
            .then(hits => {
                const filteredHits = hits.map(
                    ({ id, webformatURL, largeImageURL, tags }) => ({
                        id,
                        webformatURL,
                        largeImageURL,
                        tags,
                    }),
                );
                this.setState({
                    images: [...filteredHits],
                    page: this.state.page + 1,
                });
                this.spinnerToggle();
            })
            .catch(console.log)
            .finally(this.spinnerToggle());
    };

    getMoreImages = () => {
        const { searchQuery, page } = this.state;

        pixabayAPI
            .fetchImages(searchQuery, page)
            .then(hits => {
                const filteredHits = hits.map(
                    ({ id, webformatURL, largeImageURL, tags }) => ({
                        id,
                        webformatURL,
                        largeImageURL,
                        tags,
                    }),
                );
                this.setState(prevState => ({
                    images: [...prevState.images, ...filteredHits],
                    page: page + 1,
                }));
                this.spinnerToggle();
            })
            .catch(console.log)
            .finally(this.spinnerToggle());
    };

    submitHandler = inputValue => {
        if (this.state.searchQuery !== inputValue) {
            this.setDefaultState();
            this.setState({ searchQuery: inputValue });
        }
    };

    spinnerToggle = () => {
        this.setState(prevState => {
            return { loading: !prevState.loading };
        });
    };

    modalToggle = () => {
        this.setState(prevState => ({ activeModal: !prevState.activeModal }));
    };
    activeImageHandler = e => {
        this.setState({ activeImage: e.target.dataset.src });
        this.modalToggle();
    };

    modalCloseHandler = e => {
        e.target === e.currentTarget && this.modalToggle();
    };

    render() {
        const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
        `;
        const { loading, images, activeImage, activeModal } = this.state;
        return (
            <div className="App">
                <SearchBar onSubmit={this.submitHandler} />
                {loading && images.length === 0 && (
                    <PropagateLoader
                        css={override}
                        size={20}
                        color={'#3f51b5'}
                    />
                )}
                <ImageGallery
                    images={images}
                    getImageIdx={this.activeImageHandler}
                >
                    {loading ? (
                        <PropagateLoader
                            css={override}
                            size={20}
                            color={'#3f51b5'}
                        />
                    ) : (
                        <Button onClick={this.getMoreImages} />
                    )}
                </ImageGallery>
                {activeModal && (
                    <Modal
                        activeimage={activeImage}
                        onClick={this.modalCloseHandler}
                    />
                )}
            </div>
        );
    }
}

export default App;
