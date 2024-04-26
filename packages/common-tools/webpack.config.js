//webpack.build.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/tools.ts',
  output: {
    filename: 'common-tools.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    //   暴露库
    library: {
      //   library.type设置为module时不能设置同时设置name
      type: 'module',
    },
  },
  // 设置 type: 'module'时，必须加入以下配置
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      // 可以添加其他的loader配置，用于处理不同类型的文件
      // {
      //   test: /\.js|ts$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader', // 使用Babel处理JavaScript文件
      //     options: {
      //       presets: ['@babel/preset-env'], // 使用preset-env进行转译
      //     },
      //   },
      // },
      {
        test: /\.ts?$/, // 匹配 TypeScript 文件
        use: 'ts-loader', // 使用 ts-loader 处理 TypeScript 文件
        exclude: /node_modules/, // 排除 node_modules 目录
      },
    ],
  },
  // 依赖工具库外置：要求引用的项目本身有这个工具库
  externals: {
    // lodash: {
    //   commonjs: 'lodash',
    //   commonjs2: 'lodash',
    //   amd: 'lodash',
    //   // 配置ES module
    //   module: 'lodash',
    //   root: '_',
    // },
  },
};
