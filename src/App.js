import { Component } from 'react';
import { v4 as uuid4 } from 'uuid';
import Searchbar from './Components/Searchbar';

class App extends Component {
    state = {
        images: [],
        activeImageIdx: 0,
    };
    render() {
        return (
            <div className="App">
                <Searchbar />
            </div>
        );
    }
}

export default App;
