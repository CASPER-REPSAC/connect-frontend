const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "#comp": path.resolve(__dirname, "src/components/"),
      "#serv": path.resolve(__dirname, "src/services/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@(.*)$": "<rootDir>/src$1",
      },
    },
  },
  style: {
    postOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
