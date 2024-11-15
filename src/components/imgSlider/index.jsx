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

  const showPrevImg = () => {
    const prevIndex = (imageIndex - 1 + imgUrls.length) % imgUrls.length;
    const prevImage = new Image();
    prevImage.src = imgUrls[prevIndex].url;
    setIsNextImageLoaded(false);

    prevImage.onload = () => {
      setImageIndex(id, prevIndex);
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

  const onClickPrev = () => {
    resetSliders(id);
    setActiveSlider(id);
    if (isNextImageLoaded) {
      showPrevImg();
    }
  };

  return (
    <div className="flex h-[100vh] w-full max-[980px]:h-[60vh] relative justify-center items-center">
      <div
        onClick={onClick}
        className="cursor-pointer absolute right-0 h-full w-[50%] flex items-baseline justify-end pl-2"
      >
        <div className=" text-[rgb(51,51,51)] min-[980px]:hidden mix-blend-difference">
          ---&gt;
        </div>
      </div>
      <div
        onClick={onClickPrev}
        className="cursor-pointer absolute left-0 h-full w-[50%] flex items-baseline justify-start pr-2"
      >
        <div className=" text-[rgb(51,51,51)] min-[980px]:hidden mix-blend-difference">
          &lt;---
        </div>
      </div>

      <img
        key={imageIndex}
        src={imgUrls[imageIndex].url}
        className="object-cover h-full cursor-pointer w-fit max-[980px]:w-[100vw]"
        alt="Product Image"
      />
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
