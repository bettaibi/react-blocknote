module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
          minifyFontValues: true,
          normalizeWhitespace: true,
          reduceIdents: false, // Keep original identifiers to avoid breaking selectors
          cssDeclarationSorter: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeLonghand: true,
          mergeRules: true,
        },
      ],
    }),
  ],
};
