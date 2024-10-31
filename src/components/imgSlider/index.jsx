import PropTypes from "prop-types";
import useSliderStore from "../../store/imgSliderStore";
// import { useState } from "react";

export default function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  // const [prevIndex, setPrevIndex] = useState(imageIndex);

  const showNextImg = () => {
    // setPrevIndex(imageIndex);
    setImageIndex(id, (imageIndex + 1) % imgUrls.length);
  };

  const onClick = () => {
    resetSliders(id);
    setActiveSlider(id);
    showNextImg();
  };

  return (
    <div className="h-[100vh] w-full max-[640px]:h-[60vh]">
      <img
        key={`current-${imageIndex}`}
        src={imgUrls[imageIndex].url}
        className="object-cover w-full h-full cursor-pointer"
        onClick={onClick}
        alt="Current Image"
      />
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array,
  id: PropTypes.string,
};
