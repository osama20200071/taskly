// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": "warn", // Integrates Prettier rules in ESLint
    "react-native/no-unused-styles": "warn",
  },
};
