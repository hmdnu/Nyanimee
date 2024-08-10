import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
// @ts-expect-error, The imported object was { default: Slider } instead of just Slider
const SliderComponent = typeof window === "undefined" ? Slider.default : Slider;

export default function Carousel({ children }: { children: React.ReactNode }) {
  const settings: Settings = {
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    infinite: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  };

  return (
    <SliderComponent {...settings} className="mx-4">
      {children}
    </SliderComponent>
  );
}
