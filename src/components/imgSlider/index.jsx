import PropTypes from "prop-types";
import useSliderStore from "../../store/imgIndexStore";
import { motion } from "framer-motion";
import { useState } from "react";

export function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  const [prevIndex, setPrevIndex] = useState(imageIndex);

  const showNextImg = () => {
    setPrevIndex(imageIndex);
    setImageIndex(id, (imageIndex + 1) % imgUrls.length);
  };

  const onClick = () => {
    resetSliders(id);
    setActiveSlider(id);
    showNextImg();
  };

  return (
    <div className="relative h-[100vh] w-full max-[640px]:h-[60vh]">
      {/* Предыдущее изображение с эффектом исчезания */}
      <motion.img
        key={`prev-${prevIndex}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.2 }}
        src={imgUrls[prevIndex].url}
        className="absolute top-0 left-0 object-cover w-full h-full will-change-transform will-change-opacity will-change-filter"
        alt="Previous Image"
      />

      {/* Новое изображение с эффектом появления */}
      <motion.img
        key={`current-${imageIndex}`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        src={imgUrls[imageIndex].url}
        className="absolute top-0 left-0 object-cover w-full h-full cursor-pointer will-change-transform will-change-opacity will-change-filter"
        onClick={onClick}
        alt="Current Image"
      />
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
