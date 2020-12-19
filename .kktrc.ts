import webpack, { Configuration } from 'webpack';
import lessModules from '@kkt/less-modules';
import pkg from './package.json';
import { ParsedArgs } from 'minimist';

export default (conf: Configuration, env: string, options: ParsedArgs) => {
  conf = lessModules(conf, env, options);

  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  );
  conf.output = { ...conf.output, publicPath: './' };
  return conf;
}