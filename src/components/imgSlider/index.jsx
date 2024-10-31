import PropTypes from "prop-types";
import useSliderStore from "../../store/imgSliderStore";
import { useEffect, useState } from "react";

export default function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  const [isNextImageLoaded, setIsNextImageLoaded] = useState(true);

  useEffect(() => {
    const nextIndex = (imageIndex + 1) % imgUrls.length;
    const nextImage = new Image();
    nextImage.src = imgUrls[nextIndex].url;
    nextImage.onload = () => setIsNextImageLoaded(true);
  }, [imageIndex, imgUrls]);

  const showNextImg = () => {
    const nextIndex = (imageIndex + 1) % imgUrls.length;
    const nextImage = new Image();
    nextImage.src = imgUrls[nextIndex].url;
    setIsNextImageLoaded(false);

    nextImage.onload = () => {
      setImageIndex(id, nextIndex);
      setIsNextImageLoaded(true);
    };
  };

  const onClick = () => {
    resetSliders(id);
    setActiveSlider(id);
    if (isNextImageLoaded) {
      showNextImg();
    }
  };

  return (
    <div className="h-[100vh] w-full max-[640px]:h-[60vh]">
      <img
        key={imageIndex}
        src={imgUrls[imageIndex].url}
        className="object-cover w-full h-full cursor-pointer"
        onClick={onClick}
        alt="Product Image"
      />
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
