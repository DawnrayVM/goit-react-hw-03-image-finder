import { createUseStyles } from 'react-jss';

const url = 'https://image.flaticon.com/icons/svg/149/149852.svg';

const useStyles = createUseStyles({
    searchbar: {
        top: 0,
        left: 0,
        position: 'sticky',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 64,
        width: '100%',
        padding: { right: 24, left: 24, top: 12, bottom: 12 },
        color: '#fff',
        backgroundColor: '#3f51b5',
        boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    },
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        backgroundColor: '#fff',
        borderRadius: 3,
        overflow: 'hidden',
    },
    button: {
        display: 'inline-block',
        width: 48,
        height: 48,
        border: 0,
        backgroundImage: `url(${url})`,
        backgroundSize: '40%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: '0.6',
        transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        outline: 'none',
        '&:hover': {
            opacity: 1,
        },
    },
    buttonLabel: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        clipPath: 'inset(50%)',
        border: 0,
    },
    input: {
        display: 'inline-block',
        width: '100%',
        font: 'inherit',
        fontSize: 20,
        border: 'none',
        outline: 'none',
        paddingLeft: 4,
        paddingRight: 4,
        '&::placeholder': { font: 'inherit', fontSize: 18 },
    },
});

const Searchbar = ({ query, onSubmit }) => {
    const classes = useStyles();
    const inputValue = e => {
        query(e.target.value);
    };
    return (
        <header className={classes.searchbar}>
            <form className={classes.searchForm} onSubmit={onSubmit}>
                <button type="submit" className={classes.button}>
                    <span className={classes.buttonLabel}></span>
                </button>
                <input
                    name="input"
                    className={classes.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={inputValue}
                />
            </form>
        </header>
    );
};

export default Searchbar;
