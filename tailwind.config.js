function withOpacity(variableName) {
  return ({ opacityValue }) => {
    // if (opacityValue !== undefined) {
    //   return `rgba(var(${variableName}), opacityValue)`;
    // }
    // return `rgb(var(${variableName}))`;
    return `var(${variableName})`;
  };
}

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        base: withOpacity("--color-text-base"),
        primary: "#000000",
        secondary: "#03DAC6",
        background: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        text: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        muted: "#e0e0e0",
        error: "#e02020",
      },
      backgroundColor: {},
      borderColor: {},
      gradientColorStops: {},
      minWidth: {
        card: "280px",
      },
      maxWidth: {
        card: "300px",
      },
      maxHeight: {
        activityCard: "128px",
      },
      fontSize: {
        "2xs": "10px",
      },
    },
  },
  variants: {},
  plugins: [],
};
