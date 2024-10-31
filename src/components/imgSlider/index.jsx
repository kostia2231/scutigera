import PropTypes from "prop-types";
import useSliderStore from "../../store/imgSliderStore";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  // const [prevIndex, setPrevIndex] = useState(imageIndex);

  useEffect(() => {
    const nextIndex = (imageIndex + 1) % imgUrls.length;
    const nextImage = new Image();
    nextImage.src = imgUrls[nextIndex].url;
  }, [imageIndex, imgUrls]);

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
    <div className="relative h-[100vh] w-full max-[640px]:h-[60vh]">
      <motion.img
        key={imageIndex}
        src={imgUrls[imageIndex].url}
        className="absolute top-0 left-0 object-cover w-full h-full cursor-pointer will-change-transform will-change-opacity will-change-filter"
        onClick={onClick}
        alt="Image"
      />
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
