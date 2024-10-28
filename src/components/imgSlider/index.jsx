import { useState } from "react";
import PropTypes from "prop-types";

export function ImgSlider({ imgUrls }) {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImg = () => {
    setImageIndex((index) => (index + 1) % imgUrls.length);
  };

  return (
    <>
      <div className="mb-1 max-[640px]:mb-0">
        <img
          className="object-cover cursor-pointer max-[640px]:h-[60vh]"
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
