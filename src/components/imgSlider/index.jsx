import { useEffect, useState } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import PropTypes from "prop-types";
import useSliderStore from "../../store/imgSliderStore";

export default function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  const [currentImage, setCurrentImage] = useState(imgUrls[0].url); // Храним URL текущего изображения

  const [emblaRef, emblaApi] = EmblaCarouselReact({
    loop: true,
    speed: 0,
    draggable: true,
    align: "start",
  });

  useEffect(() => {
    // Предзагрузка текущего, следующего и предыдущего изображений
    const preloadImages = () => {
      const nextIndex = (imageIndex + 1) % imgUrls.length;
      const prevIndex = (imageIndex - 1 + imgUrls.length) % imgUrls.length;

      // Текущее изображение
      const currentImg = new Image();
      currentImg.src = imgUrls[imageIndex].url;
      currentImg.onload = () => setCurrentImage(currentImg.src);

      // Следующее изображение
      const nextImg = new Image();
      nextImg.src = imgUrls[nextIndex].url;

      // Предыдущее изображение
      const prevImg = new Image();
      prevImg.src = imgUrls[prevIndex].url;
    };

    preloadImages();
  }, [imageIndex, imgUrls]);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      if (newIndex !== imageIndex) {
        setImageIndex(id, newIndex);
        resetSliders(id);
        setActiveSlider(id);
      }
    };

    emblaApi.on("select", onScroll);

    return () => {
      emblaApi.off("select", onScroll);
    };
  }, [emblaApi, id, imageIndex, setImageIndex, resetSliders, setActiveSlider]);

  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== imageIndex) {
      emblaApi.scrollTo(imageIndex, true);
    }
  }, [emblaApi, imageIndex]);

  const showNextImg = () => {
    const nextIndex = (imageIndex + 1) % imgUrls.length;
    setImageIndex(id, nextIndex);
  };

  const onClick = () => {
    resetSliders(id);
    setActiveSlider(id);
    showNextImg();
  };

  return (
    <div
      className="embla relative flex h-[100vh] w-full max-[640px]:h-[60vh] justify-center"
      ref={emblaRef}
    >
      <div className="embla__container">
        {imgUrls.map((img, index) => (
          <div key={index} className="embla__slide">
            <img
              src={img.url || currentImage}
              onClick={onClick}
              className="object-cover h-full cursor-pointer w-full max-[640px]:w-[100vw]"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 flex justify-center p-0 mb-1 ml-4 embla__dots min-[640px]:hidden">
        {imgUrls.map((_, index) => (
          <div
            key={index}
            onClick={() => setImageIndex(id, index)}
            className={`hidden max-[640px]:block embla__dot w-1 h-1 mr-2 rounded-full cursor-pointer   ${
              index === imageIndex ? "bg-black" : "bg-black/20"
            }`}
          />
        ))}
      </div>
      <div className="absolute right-0 flex justify-center mt-2 embla__dots max-[640px]:hidden">
        {imgUrls.map((_, index) => (
          <div
            key={index}
            onClick={() => setImageIndex(id, index)}
            className={`embla__dot w-1 h-1 mr-2 rounded-full cursor-pointer   ${
              index === imageIndex ? "bg-black" : "bg-black/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

ImgSlider.propTypes = {
  imgUrls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
