module.exports = {
  devServer: {
    host: 'localhost'
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/variable.scss";
          @import "~@/assets/scss/global.scss";
        `
      }
    }
  }
};
