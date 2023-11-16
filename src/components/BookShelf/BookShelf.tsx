import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./sliderStyles/sliderStyles.scss";
import { Icon, IconEnum } from "..";
import IcoMoon from "react-icomoon";

const BookShelf: FC = () => {
  function SampleNextArrow({ ...props }) {
    const { className, style, onClick, icon } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "green",
        }}
        onClick={onClick}
      >
        <Icon icon={IconEnum.ArrowRight} />
      </div>
    );
  }

  function SamplePrevArrow({ ...props }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      ></div>
    );
  }
  const settings = {
    slide: "p",
    adaptiveHeight: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: innerWidth < 480 ? 5 : 3,
    slidesToScroll: innerWidth < 480 ? 1 : 3,
    swipeToSlide: false,
    centerPadding: "10px",
    nextArrow: <SampleNextArrow />,
    prevArrow: (
      <SamplePrevArrow className={""} style={{}} onClick={undefined} />
    ),
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/0c6e/a6af/3905a1d6b763f5466f2b801f33344a99?Expires=1700438400&Signature=St7Ux88i1EY3iVQrvsfJC1bOClTjYdKRXr912iuHEuvAulHdqIFHYpy0-WbmB1hEqjGmiIfwa83mpJROghPGA8kqW4YivqPS1t-pRcTvmXdQqc24dbEuruxe8yo5LomJodEca~SJiXAe2A4rHlAymMR5klVjC1mZxKYIiM5RgExTPDlylJ~DQhDrxN~RRZpBixvlubm68-BCsEN3puhvc-lovhHX61FpudQwzwlPDv4Vi9rGcQjzaWYbkqEFIDnMJ0gSYKebcQOib-wmWwa1hiNqZO2SEq~YF7Z-~ByRDj3wWRPca2oqwhIliJDLzfUbccu1jvr4lPw5zJ8tZ995sw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
          <p>Harry Potter and the Philosopher's Stone</p>
        </div>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/2a5d/5d8b/e825d5a8786ab45add692af432a257f1?Expires=1700438400&Signature=q0rK4lYzpmcUmYbwVl7yCR2c1k4Pjdq3Xg~gWAegfGULLTE6I-5ER5kxLc68m8L0kUEg3SjjIrjq2Qult2IjFaB7TUPA9rH8eZbNSYli1Pot~S4UeapmxzGtR7RQbHh0N4z5C2THjOPmF5AGPe-ltikPSvkjFg8UNzXurGD-nos4kUrxPuD6VmkPmx6TCxc2u0OoHOIL1jUspOIJ7FGRNPzbwCdM97iOT~tM2uzN~DR-X0QHOv5zO0XQAUcpgEdUeRm-~j2qjlRLl~tX9swJ5rn00-TShFmENjufihaYFM9qRWy6~B9ttGymuWa-C6sMhtGMXPvV~Krz0FZNJip~Xg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
          <p>Fight club</p>
        </div>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/1301/9fc3/91290971b5c5588d4f5b7a498522b07e?Expires=1700438400&Signature=EJcS5zB64~7HkylXirulosn4ZcdQ~E0~0ezFrRuPL2hN7R3HtsZ4-8wEi8zGyF2bVvo8DH23VU9t2uI3LvmDvNuzpV0e8TrGFocB~wEEYoEmvB3sLEaUY20lRyH8vBUuh~uP127Syf1OgkPIYpWJVDPEHPBQlvP2cAXnpT9buTrQBXIHW6a0C0HKahwDqWqcgGUYbzkblEtY73~opCZA8NVORblZ9RT8E-Ku6NAf07uhotlm5aamUSvWlx~1as0TqS8lj6iXGk84Hd5ih5P7~CUdxsmurxXlw17Z82tPgY1Z22-ueU4IbDUdryLRKKcr1f8R7smtuSA5bYjTgBEl1g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
          <p>1984</p>
        </div>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/df7f/848b/9632c20f2606a363531a86fe80035505?Expires=1700438400&Signature=iLDgp7YXUjfsayWo0PD6N2G3dpuIhQvAvyNJwqS3akxVnd9YPQYHSQ6o7Okx3-1XU0msXqvlwio6Z0ifn6BKZz7NMcV-GtO7-S75-W-9JyzeeZxZZ0kYIzPfPfL5G0iRAiss-Px4L9NhQreAA-KFocuXunyKesdauYBP6QEKr9Q6vF8aPAIVFPvvgSPsWAvAWs3Zs3Bqnqg2~IZL6bkdp-5UbP-vVGiA2YWe189mic13934rgiF5We7~ct8a7EubG49nUI7-IISU5CL~QNU8n40Ch1o-LtA2RzdJcGYMFQ~KWNJ07XSnsxEVDKVIj5t-2TtnGrS7-71RlaIYYMi5wQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
          <p>Harry Potter and the</p>
        </div>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/0f7d/d853/323d813d993efe004d70523ddddb8314?Expires=1700438400&Signature=DwZVis1S0cONBtMubJQSCKP~lHQal4iIYtSFW8-t6i0JM4aX-Z7lykQBX~D489W4-V57IEEv8xdge4Ut5b5sSmkzAEBGvk68JcmjuXMQiCxkQDY4NxmD0a0vnwempVQF0l0HGd-u6fSkiwqANZciWsoNNAz647No3RUaft9xf-2XDrufoZQaxIsxN7~er7B9ZpCMyCh9KOKhPpjT8AhYmaZ81F3pBHTmR-ur366zVnhP6rDfqzhCf6jyWN5ifV87cMc~Fu2WlyW9YqjFUjLXjlzKVkDdBF5xaED76qr~eDjyBX5QOLu9OGpFbHfQa49U9hrWiWXt4HGkgY1~gwMVMw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </div>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/1301/9fc3/91290971b5c5588d4f5b7a498522b07e?Expires=1700438400&Signature=EJcS5zB64~7HkylXirulosn4ZcdQ~E0~0ezFrRuPL2hN7R3HtsZ4-8wEi8zGyF2bVvo8DH23VU9t2uI3LvmDvNuzpV0e8TrGFocB~wEEYoEmvB3sLEaUY20lRyH8vBUuh~uP127Syf1OgkPIYpWJVDPEHPBQlvP2cAXnpT9buTrQBXIHW6a0C0HKahwDqWqcgGUYbzkblEtY73~opCZA8NVORblZ9RT8E-Ku6NAf07uhotlm5aamUSvWlx~1as0TqS8lj6iXGk84Hd5ih5P7~CUdxsmurxXlw17Z82tPgY1Z22-ueU4IbDUdryLRKKcr1f8R7smtuSA5bYjTgBEl1g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </div>
        <div className="slide-item-wrapper">
          <img
            src="https://s3-alpha-sig.figma.com/img/1301/9fc3/91290971b5c5588d4f5b7a498522b07e?Expires=1700438400&Signature=EJcS5zB64~7HkylXirulosn4ZcdQ~E0~0ezFrRuPL2hN7R3HtsZ4-8wEi8zGyF2bVvo8DH23VU9t2uI3LvmDvNuzpV0e8TrGFocB~wEEYoEmvB3sLEaUY20lRyH8vBUuh~uP127Syf1OgkPIYpWJVDPEHPBQlvP2cAXnpT9buTrQBXIHW6a0C0HKahwDqWqcgGUYbzkblEtY73~opCZA8NVORblZ9RT8E-Ku6NAf07uhotlm5aamUSvWlx~1as0TqS8lj6iXGk84Hd5ih5P7~CUdxsmurxXlw17Z82tPgY1Z22-ueU4IbDUdryLRKKcr1f8R7smtuSA5bYjTgBEl1g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default BookShelf;
