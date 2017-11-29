// These rules enforce the Hack Reactor Style Guide
// Visit this repo for more information:
// https://github.com/reactorcore/eslint-config-hackreactor
 

module.exports = {
  extends: [
    "./node_modules/eslint-config-hackreactor/index.js",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "camelcase": "off"
  }
};