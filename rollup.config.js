import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const extensions = ['.ts', '.tsx'];

export default {
  input: 'src/examples/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
  },
  plugin: [
    nodeResolve({
      extensions,
    }),
    json(),
    babel({
      extensions,
      exclude: 'node_modules',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      runtimeHelpers: true,
    }),
    livereload({
      watch: 'dist',
    }),
    serve({
      open: true,
      port: 8066,
      openPage: '/examples/index.html',
      contentBase: '',
    }),
  ],
};
