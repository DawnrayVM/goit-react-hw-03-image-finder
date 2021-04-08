import { useCreateStyles, createUseStyles } from 'react-jss';
import ImageGalleryItem from '../ImageGalleryItem';

const useStyles = createUseStyles({
    imageGallery: {
        display: 'grid',
        maxWidth: 'calc(100vw - 48px)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gridGap: 16,
        margin: { top: 0, bottom: 0 },
        padding: 0,
        listStyle: 'none',
        margin: { left: 'auto', right: 'auto' },
    },
});

const ImageGallery = ({ images, children, getImageIdx }) => {
    const classes = useStyles();
    return (
        images.length > 0 && (
            <>
                <ul className={classes.imageGallery}>
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
