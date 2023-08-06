import logo from "src/assets/SVG/logo.svg";

const Logo = () => {
  return (
    <span className="hidden absolute left-[3vw] top-[4vh] md:inline w-1/6 max-w-[107px] ">
      <img className="w-full" src={logo} alt="logo.svg" />
    </span>
  );
};

export default Logo;
