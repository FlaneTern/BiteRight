module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["inline-import", { extensions: [".ql"] }], 'react-native-reanimated/plugin'],
  };
};
