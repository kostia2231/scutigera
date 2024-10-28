import { useState } from "react";
import PropTypes from "prop-types";

export function ImgSlider({ imgUrls }) {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImg = () => {
    setImageIndex((index) => (index + 1) % imgUrls.length);
  };

  return (
    <>
      <div>
        <img
          className="object-cover cursor-pointer max-[640px]:h-[60vh] h-[100vh]"
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
