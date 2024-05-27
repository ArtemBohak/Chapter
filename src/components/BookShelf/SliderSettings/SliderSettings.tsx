import { Icon, IconEnum } from "@/src/components/Icon";

export const SampleNextArrow = ({ ...props }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: innerWidth < 1367 ? "none" : "block",
      }}
      onClick={onClick}
    >
      <Icon icon={IconEnum.NextSlide} width={32} height={32} color="orange" />
    </div>
  );
};

export const SamplePrevArrow = ({ ...props }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    ></div>
  );
};

export const settings = {
  adaptiveHeight: false,
  dots: false,
  infinite: false,
  speed: 500,
  swipeToSlide: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,

};
