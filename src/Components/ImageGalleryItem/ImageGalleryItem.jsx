const ImageGalleryItem = ({ images, getImageIdx }) => {
    return images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className="ImageGalleryItem" key={id}>
            <img
                src={webformatURL}
                alt={tags}
                data-src={largeImageURL}
                className="ImageGalleryItem-image"
                onClick={getImageIdx}
            />
        </li>
    ));
};

export default ImageGalleryItem;
