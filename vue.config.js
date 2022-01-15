module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      // proxyTable 설정
      "/v1": {
        target: "http://localhost:27777",
        changeOrigin: true
      }
    }
  }
};
