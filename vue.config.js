/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-05-07 10:45:20
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-05-08 16:56:32
 */

const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'));
  }
};
