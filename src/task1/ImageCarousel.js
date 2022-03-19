import React, {useState, useEffect} from "react";
import {fetchImageUrls} from "../api/index.js";
import './ImageCarousel.css';

const ImageCarousel = (props) => {

    const loadingGifUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif';
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageSet, setImageSet] = useState(() => undefined);
    const [currentImageIndex, setCurrentImageIndex] = useState(() => 0);
    const [maxImageIndex, setMaxImageIndex] = useState(() => 0);

    useEffect(async () => {
        const urls = await fetchImageUrls();
        setImageSet(urls);
        setMaxImageIndex(urls?.length - 1);
    }, [])
    const cyclicImageMoving = (currentIndex,advancmentFactor) => {
        const tempIndex = currentIndex + advancmentFactor;
        if(tempIndex < 0){
            return maxImageIndex;
        }
        if(tempIndex > maxImageIndex){
            return 0;
        }
        return tempIndex;
    }
    const movePicture = (advancmentFactor) => {
        setIsImageLoaded(false);
        setCurrentImageIndex((currentIndex)=>cyclicImageMoving(currentIndex,advancmentFactor))
        preloadNextImage();
    }
    const preloadNextImage = () => {
        const leftImage = new Image();
        const rightImage = new Image();
        rightImage.src = imageSet?.[cyclicImageMoving(currentImageIndex, 1)];
        leftImage.src = imageSet?.[cyclicImageMoving(currentImageIndex, -1)];
    }
    return <>
        {Boolean(maxImageIndex) && <div className={'container'}>
            <img
                className={'arrow leftArrow'}
                src={"https://cdn-icons-png.flaticon.com/512/709/709586.png"}
                onClick={() => {
                    movePicture(-1)
                }}
            />
            <div className={'Gallery'}>
                <img
                    className={'image'}
                    style={isImageLoaded ? {} : {display: 'none'}}
                    src={imageSet?.[currentImageIndex]}
                    onLoad={() => setIsImageLoaded(true)}
                />
                <img
                    className={'loading-gif'}
                    style={isImageLoaded ? {display: 'none'} : {}}
                    src={loadingGifUrl}
                />
            </div>
            <img
                className={'arrow rightArrow'}
                src={"https://cdn-icons-png.flaticon.com/512/709/709586.png"}
                onClick={() => {
                    movePicture(1)
                }}
            />

        </div>}
        {Boolean(!maxImageIndex) &&
            <div className={"empty"}> No images received yet </div>
        }
    </>
};
export default ImageCarousel;
