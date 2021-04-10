import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    imageGalleryItem: {
        borderRadius: 2,
        boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    },

    imageGalleryItemImage: {
        width: '100%',
        height: 260,
        objectFit: 'cover',
        transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            transform: 'scale(1.03)',
            cursor: 'zoom-in',
        },
    },
});

const ImageGalleryItem = ({ images, getImageIdx }) => {
    const classes = useStyles();
    return images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={classes.imageGalleryItem} key={id}>
            <img
                src={webformatURL}
                alt={tags}
                data-src={largeImageURL}
                className={classes.imageGalleryItemImage}
                onClick={getImageIdx}
            />
        </li>
    ));
};

export default ImageGalleryItem;
