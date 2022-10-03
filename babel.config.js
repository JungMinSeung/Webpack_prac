module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
          ie: "11",
        },
        useBuiltIns: "usage", // entry, false
        corejs: {
          // 폴리필 라이브러리
          version: 2,
        },
      },
    ],
  ],
};
