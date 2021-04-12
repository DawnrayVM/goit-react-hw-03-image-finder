import { createUseStyles } from 'react-jss';
import { useState, useEffect } from 'react';

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

const Modal = ({ activeimage, onClick, onKeydown }) => {
    const classes = useStyles();
    const closeModal = e => {
        if (e.code === 'Escape') {
            onKeydown();
        }
    };
    useEffect(() => {
        // console.log('modal did mount');
        window.addEventListener('keydown', closeModal);
    }, []);
    useEffect(() => {
        return () => {
            // console.log('will unmount');
            window.removeEventListener('keydown', closeModal);
        };
    }, []);
    return (
        <div className={classes.overlay} onClick={onClick}>
            <div className={classes.modal}>
                <img src={activeimage} alt="Photo from Pixabay" />
            </div>
        </div>
    );
};

export default Modal;
