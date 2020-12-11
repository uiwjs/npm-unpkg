import path from 'path';
import { OptionConf } from 'kkt';
import webpack from 'webpack';

type Webpack = typeof webpack;

export const loaderOneOf = [require.resolve('@kkt/loader-less')];

export const moduleScopePluginOpts = [path.resolve(process.cwd(), 'README.md')];

export default (
  conf: webpack.Configuration,
  opts: OptionConf,
  webpack: Webpack,
) => {
  const pkg = require(path.resolve(process.cwd(), 'package.json'));

  conf.resolve!.alias = {
    // 当前开发模式需要
    // https://github.com/marmelab/react-admin/issues/3078#issuecomment-579128213
    // react: path.resolve('./node_modules/react'),
    // "react-router": path.resolve("./node_modules/react-router"),
    // "react-router-dom": path.resolve("./node_modules/react-router-dom"),
    '@': path.resolve(__dirname, 'src'),
  };

  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  );

  conf.output = { ...conf.output, publicPath: './' };
  return conf;
};
