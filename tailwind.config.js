function withOpacity(variableName) {
  return ({ opacityValue }) => {
    // if (opacityValue !== undefined) {
    //   return `rgba(var(${variableName}), opacityValue)`;
    // }
    // return `rgb(var(${variableName}))`;
    return `var(${variableName})`;
  };
}

// 50: "#fafaf9",
// 100: "#f5f5f4",
// 200: "#e7e5e4",
// 300: "#d6d3d1",
// 400: "#a8a29e",
// 500: "#78716c",
// 600: "#57534e",
// 700: "#44403c",
// 800: "#292524",
// 900: "#1c1917",

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#03DAC6",
        point: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        background: {
          50: withOpacity("--color-connect-text-50"),
          100: withOpacity("--color-connect-text-100"),
          200: withOpacity("--color-connect-text-200"),
          300: withOpacity("--color-connect-text-300"),
          400: withOpacity("--color-connect-text-400"),
          500: withOpacity("--color-connect-text-500"),
          600: withOpacity("--color-connect-text-600"),
          700: withOpacity("--color-connect-text-700"),
          800: withOpacity("--color-connect-text-800"),
          900: withOpacity("--color-connect-text-900"),
        },
        text: {
          50: withOpacity("--color-connect-text-50"),
          100: withOpacity("--color-connect-text-100"),
          200: withOpacity("--color-connect-text-200"),
          300: withOpacity("--color-connect-text-300"),
          400: withOpacity("--color-connect-text-400"),
          500: withOpacity("--color-connect-text-500"),
          600: withOpacity("--color-connect-text-600"),
          700: withOpacity("--color-connect-text-700"),
          800: withOpacity("--color-connect-text-800"),
          900: withOpacity("--color-connect-text-900"),
        },
        muted: "#e0e0e0",
        error: "#e02020",
        alert: "#e02020",
      },
      backgroundColor: {},
      borderColor: {},
      gradientColorStops: {},
      minWidth: {
        card: "230px",
        tabletCard: "250px",
        smCard: "180px",
        tooltip: "120px",
      },
      maxWidth: {
        card: "300px",
        tabletCard: "250px",
        smCard: "180px",
        tooltip: "200px",
      },
      maxHeight: {
        activityCard: "128px",
        card: "128px",
        commentInput: "80px",
        tabletCard: "140px",
        chapterList: "25vh",
        detailCard: "calc(100vh - 25px)",
      },
      minHeight: {
        activityCard: "128px",
        card: "128px",
        commentInput: "80px",
        tabletCard: "140px",
        chapterList: "25vh",
        detailCard: "calc(100vh - 25px)",
      },
      gridRowEnd: {
        minus1: "-1",
        minus2: "-2",
      },
      gridTemplateColumns: {
        mainXl: "min-content 1fr min-content",
        mainMd: "fit-content fit-content fit-content",
      },
      gridTemplateRows: {},
    },
  },
  variants: {},
  plugins: [],
};
