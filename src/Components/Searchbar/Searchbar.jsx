import { createUseStyles } from 'react-jss';

const Searchbar = ({ onQuery }) => {
    const findImage = e => {
        e.preventDefault();
        console.log(e.target);
    };
    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={findImage}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>
                <input
                    className="SearchForm-input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

export default Searchbar;
