import { useState } from "react";
import PropTypes from "prop-types";

export function ImgSlider({ imgUrls }) {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImg = () => {
    setImageIndex((index) => (index + 1) % imgUrls.length);
  };

  return (
    <>
      <div className="mb-1">
        <img
          className="cursor-pointer h-[70vh]"
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
