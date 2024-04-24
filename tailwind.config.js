/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulsate: {
          "0%": { transform: "scale(1)", opacity: "0" },
          "50%": { transform: "scale(2)", opacity: "40" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: { pulsate: "pulsate 2s infinite" },
      screens: {
        sm: "376px", // everything higher than 375px is considered as a tablet-sized markup
        md: "769px", // everything higher than 768px is considered as a desktop-sized markup
        base: "1025px", // everything higher than 1024 is considered as normal desktop-sized markup
        laptop: "1367px", // everything higher than 1440 is considered as laptop desktop-sized markup
        laptop_md: "1681px", // everything higher than 1680 is considered as laptop desktop-sized markup
        lg: "1921px", // the maximum size of our markup is 1920px
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
      },
      boxShadow: {
        bottom: "0px 1px 11px 0px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        "0-sm": "4px",
        "0-md": "8px",
        "1-xs": "10px",
        "1-sm": "12px",
        "1-md": "14px",
        "1-lg": "16px",
        "1-xl": "18px",
        "2-xs": "20px",
        "2-sm": "22px",
        "2-md": "24px",
        "2-lg": "26px",
        "2-xl": "28px",
        "3-xs": "30px",
        "3-sm": "32px",
        "3-md": "34px",
        "3-lg": "36px",
        "3-xl": "38px",
        "4-xs": "40px",
        "4-sm": "42px",
        "4-md": "44px",
        "4-lg": "46px",
        "4-xl": "48px",
        "5-xs": "50px",
        "5-sm": "52px",
        "5-md": "54px",
        "5-lg": "56px",
        "5-xl": "58px",
      },
      colors: {
        primary: "#F69400",
        primaryHover: "#E78A00",
        orange: "#FFBD5A",
        black: "#000000",
        grey: {
          1000: "#6C6C6C",
          1010: "#D0D0D0",
          1020: "#EEEEEE",
          1030: "#F2F2F2",
          1040: "##FDFDFD",
        },
        green: "#2BBF06",
        red: "#D22219",
        blue: "#0000EB",
      },
      fontSize: {
        xxs: "10px",
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "26px",
        h1_sm: "28px",
        h1_lg: "50px",
        h2_sm: "20px",
        h2_lg: "42px",
        h3_sm: "16px",
        h3_lg: "32px",
        h4_sm: "14px",
        h4_lg: "26px",
        h5_sm: "14px",
        h5_lg: "20px",
      },
      fontFamily: {
        raleway: ["Raleway"],
      },
    },
  },
  plugins: [],
};
