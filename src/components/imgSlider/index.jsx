import { useState } from "react";
import PropTypes from "prop-types";

export function ImgSlider({ imgUrls }) {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImg = () => {
    setImageIndex((index) => (index + 1) % imgUrls.length);
  };

  return (
    <>
      <div className="h-auto mb-1">
        <img
          className="h-auto cursor-pointer"
          onClick={showNextImg}
          src={imgUrls[imageIndex].url}
        />
      </div>
    </>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
};
