const parseImage = async (images) => (images[0] ? images[0].urls.small : '');

export default parseImage;
