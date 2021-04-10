import { createUseStyles } from 'react-jss';
import ImageGalleryItem from '../ImageGalleryItem';

const useStyles = createUseStyles({
    imageGallery: {
        display: 'grid',
        maxWidth: 'calc(100vw - 48px)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gridGap: 16,
        margin: { top: 0, bottom: 0, left: 'auto', right: 'auto' },
        padding: 0,
        listStyle: 'none',
    },
});

const ImageGallery = ({ images, children, getImageIdx }) => {
    const classes = useStyles();
    return (
        images.length > 0 && (
            <>
                <ul className={classes.imageGallery} id="gallery">
                    <ImageGalleryItem
                        images={images}
                        getImageIdx={getImageIdx}
                    />
                </ul>
                {children}
            </>
        )
    );
};

export default ImageGallery;
