import { Component } from 'react';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Searchbar from './Components/Searchbar';
import pixabayAPI from './services/image-finder-api';
import Button from './Components/Button';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';

class App extends Component {
    state = {
        images: [],
        query: '',
        page: 1,
        activeImage: '',
        activeModal: false,
        loading: false,
    };

    scrollToEnd = () => {
        const scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
        );
        setTimeout(() => {
            window.scrollTo({
                top: scrollHeight - 140,
                behavior: 'smooth',
            });
        }, 350);
    };

    getMoreImages = () => {
        pixabayAPI
            .fetchImages(this.state.query, this.state.page)
            .then(hits => {
                const filteredData = hits.map(
                    ({ id, webformatURL, largeImageURL, tags }) => ({
                        id,
                        webformatURL,
                        largeImageURL,
                        tags,
                    }),
                );
                this.setState(prevState => ({
                    images: [...prevState.images, ...filteredData],
                    page: prevState.page + 1,
                }));

                this.spinnerToggle();
            })
            .catch(error => console.log('this is an error', error))
            .finally(this.spinnerToggle());
        this.scrollToEnd();
    };

    queryHandler = wordToFind => {
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
                    this.setState(prevState => ({
                        images: [...filteredData],
                        page: prevState.page + 1,
                    }));
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
                    {this.state.loading ? (
                        <PropagateLoader
                            css={override}
                            size={20}
                            color={'#3f51b5'}
                        />
                    ) : (
                        <Button onClick={this.getMoreImages} />
                    )}
                </ImageGallery>
                {this.state.activeModal && (
                    <Modal
                        activeimage={this.state.activeImage}
                        onClick={this.modalCloseHandler}
                    />
                )}
            </div>
        );
    }
}

export default App;
