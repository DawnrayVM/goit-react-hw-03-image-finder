import { Component } from 'react';
import {
    Searchbar,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
} from './Searchbar.module.css';

class SearchBar extends Component {
    state = {
        inputValue: '',
    };

    inputHandler = e => {
        this.setState({ inputValue: e.target.value });
    };

    submitForm = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.inputValue);
    };

    render() {
        return (
            <header className={Searchbar}>
                <form className={SearchForm} onSubmit={this.submitForm}>
                    <button type="submit" className={SearchFormButton}>
                        <span className={SearchFormButtonLabel}></span>
                    </button>
                    <input
                        name="input"
                        className={SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.inputHandler}
                    />
                </form>
            </header>
        );
    }
}

export default SearchBar;
