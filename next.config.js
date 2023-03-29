// next.config.js

// module.exports = {
//   reactStrictMode: true,
//   env: {
//     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//   },
// };


const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config) => {
    config.plugins.push(new Dotenv());
    return config;
  },
};
