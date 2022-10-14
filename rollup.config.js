import createBanner from 'create-banner';
import typescript from '@rollup/plugin-typescript';
import { camelCase } from 'change-case';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import pkg from './package.json';

const name = camelCase(pkg.name);
const banner = createBanner({
  data: {
    year: '2022-present',
  },
  template: 'inline',
});
const isDev = () => process.env.NODE_ENV === 'development';

export default ['umd', 'esm'].map((format) => ({
  input: 'src/index.ts',
  output: ['development', 'production'].map((mode) => {
    const output = {
      banner,
      format,
      name,
      file: pkg.main,
    };

    if (format === 'esm') {
      output.file = pkg.module;
    }

    if (mode === 'production') {
      output.compact = true;
      output.file = output.file.replace(/(\.js)$/, '.min$1');
      output.plugins = [
        terser({
          compress: {
            drop_console: !isDev(),
          },
        }),
      ];
    }

    return output;
  }),
  plugins: [
    typescript(),
    isDev() && livereload(),
    isDev() && serve({
      open: true,
      openPage: '/public/index.html',
    }),
  ],
}));
