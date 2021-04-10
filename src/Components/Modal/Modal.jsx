import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1200,
        padding: { top: 50, bottom: 50 },
    },

    modal: {
        maxWidth: 1280,
        maxHeight: 'auto',
        overflow: 'hidden',
    },
});

const Modal = ({ activeimage, onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.overlay} onClick={onClick}>
            <div className={classes.modal}>
                <img src={activeimage} alt="asd" />
            </div>
        </div>
    );
};

export default Modal;
