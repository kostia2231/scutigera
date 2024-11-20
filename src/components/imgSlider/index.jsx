import { useEffect } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import PropTypes from "prop-types";
import useSliderStore from "../../store/imgSliderStore";

export default function ImgSlider({ imgUrls, id }) {
  const { sliders, setActiveSlider, setImageIndex, resetSliders } =
    useSliderStore();
  const imageIndex = sliders[id] || 0;
  const [emblaRef, emblaApi] = EmblaCarouselReact({
    loop: true,
    speed: 10,
    draggable: true,
    align: "start",
  });

  console.log(sliders);

  useEffect(() => {
    const head = document.head;
    imgUrls.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.url;
      head.appendChild(link);
    });
  }, [imgUrls]);

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
    if (emblaApi) {
      emblaApi.scrollNext(true);
    }
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
          <div key={`${img.url}-${index}`} className="embla__slide">
            <picture>
              <source
                srcSet={img.url.replace(".jpeg", ".webp")}
                type="image/webp"
              />
              <img
                src={img.url}
                onClick={onClick}
                className="object-cover h-full cursor-pointer w-full max-[640px]:w-[100vw]"
                alt={`Image ${index + 1}`}
              />
            </picture>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 flex justify-center p-0 mb-4 embla__dots">
        {imgUrls.map((_, index) => (
          <div
            key={index}
            onClick={() => setImageIndex(id, index)}
            className={`embla__dot w-1 h-1 mr-2 rounded-full cursor-pointer ${
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
