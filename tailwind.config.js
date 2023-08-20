/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "376px", // everything higher than 375px is considered as a tablet-sized markup
        md: "769px", // everything higher than 768px is considered as a desktop-sized markup
        base: "1025px", // everything higher than 1024 is considered as normal desktop-sized markup
        laptop: "1367px", // everything higher than 1440 is considered as laptop desktop-sized markup
        laptop_md: "1681px", // everything higher than 1680 is considered as laptop desktop-sized markup
        lg: "1921px", // the maximum size of our markup is 1920px
      },
      colors: {
        orange: {
          1000: "#F69400", // button 1
          1050: "#E78A00", // button 1 hovered
          1100: "#E99136", // outlined button border and text
          1200: "#F79400", // button 3
          1250: "#E78A00", // button 3 hovered
        },
        black: {
          1000: "#1C1C1E", // default text color
          1100: "#1D1D1D", // black outlined button
        },
        pink: {
          1050: "#FFF8F1", // button 2 hovered
        },
        gray: {
          1060: "#D0D0D0", // button disabled
          1070: "#F2F2F7", //disabled button text
          1030: "#8E8E93", //validation form color
        },
        green: {
          1010: "#2BBF06", // success color
        },
        red: {
          1020: "#D0140A", // error color
          1130: "#D22219", // validation error color
        },
        blue: {
          1030: "#0000EB", // link color
        },
      },
      fontSize: {
        xxs: "10px",
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        h1_sm: "48px",
        h1_lg: "50px",
        h2_sm: "38px",
        h2_lg: "42px",
        h3_sm: "28px",
        h3_lg: "32px",
        h4_sm: "22px",
        h4_lg: "26px",
        h5_sm: "18px",
        h5_lg: "20px",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
