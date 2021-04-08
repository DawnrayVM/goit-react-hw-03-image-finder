import { Component } from 'react';
import { v4 as uuid4 } from 'uuid';
import Searchbar from './Components/Searchbar';
import pixabayAPI from './services/image-finder-api';

class App extends Component {
    state = {
        images: [],
        activeImageIdx: 0,
        activeModal: false,
        query: '',
    };

    componentDidMount() {
        pixabayAPI.fetchImages('dog').then(hits => {
            const filteredData = hits.map(
                ({ id, webformatURL, largeImageURL }) => ({
                    id,
                    webformatURL,
                    largeImageURL,
                }),
            );
            this.setState({ images: [...filteredData] });
        });
    }
    queryHandler = wordToFind => {
        this.setState({ query: wordToFind });
    };

    modalToggle = () => {
        this.setState(prevState => ({ activeModal: !prevState.activeModal }));
    };

    setData = () => {
        console.log(this.state);
    };

    render() {
        return (
            <div className="App">
                <Searchbar onQuery={this.queryHandler} />
                <button type="button" onClick={this.setData}></button>
            </div>
        );
    }
}

export default App;
