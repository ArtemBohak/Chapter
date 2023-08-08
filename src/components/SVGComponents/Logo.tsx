import logo from "src/assets/SVG/logo.svg";

const Logo = () => {
  return (
    <span className="hidden absolute left-[70px] top-[70px] md:hidden w-1/6 max-w-[107px] ">
      <img className="w-full" src={logo} alt="logo.svg" />
    </span>
  );
};

export default Logo;
