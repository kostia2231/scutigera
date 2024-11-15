import PropTypes from "prop-types";
import useSliderStore from "../../store/imgSliderStore";
import { useEffect, useState, useRef } from "react";

export default function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  const [isNextImageLoaded, setIsNextImageLoaded] = useState(true);
  const startX = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    const nextIndex = (imageIndex + 1) % imgUrls.length;
    const nextImage = new Image();
    nextImage.src = imgUrls[nextIndex].url;
    nextImage.onload = () => setIsNextImageLoaded(true);
  }, [imageIndex, imgUrls]);

  const showNextImg = () => {
    const nextIndex = (imageIndex + 1) % imgUrls.length;
    setImageIndex(id, nextIndex);
  };

  const showPrevImg = () => {
    const prevIndex = (imageIndex - 1 + imgUrls.length) % imgUrls.length;
    setImageIndex(id, prevIndex);
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

  const onMouseDown = (e) => {
    startX.current = e.clientX || e.touches[0].clientX;
    isSwiping.current = true;
  };

  const onMouseMove = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.clientX || e.touches[0].clientX;
    const diff = startX.current - currentX;

    if (diff > 100) {
      showNextImg();
      resetSliders(id);
      setActiveSlider(id);
      isSwiping.current = false;
    } else if (diff < -100) {
      showPrevImg();
      resetSliders(id);
      setActiveSlider(id);
      isSwiping.current = false;
    }
  };

  const onMouseUp = () => {
    isSwiping.current = false;
  };

  return (
    <div
      className="relative flex h-[100vh] w-full max-[980px]:h-[60vh] justify-center"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
    >
      <div
        onClick={onClick}
        className="cursor-pointer absolute right-0 h-full w-[50%] flex items-center justify-start"
      ></div>
      <div
        onClick={onClickPrev}
        className="cursor-pointer left-0 absolute h-full w-[50%] flex"
      >
        <div className="text-[rgb(51,51,51)] min-[980px]:hidden mix-blend-difference pl-4 mr-auto mt-auto">
          {imageIndex + 1 + "/" + imgUrls.length}
        </div>
      </div>

      <img
        key={imageIndex}
        src={imgUrls[imageIndex].url}
        className={`object-cover h-full cursor-pointer w-fit max-[980px]:w-[100vw] transition-opacity duration-700`}
        alt="Product Image"
      />
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
