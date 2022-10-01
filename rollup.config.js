import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

const esm = {
	input: 'src/index.js',
	output: {
		format: 'es',
		file: './dist/js/selectool.esm.js',
	}
};

const umd = {
	input: 'src/index.js',
	output: {
		format: 'umd',
		name: 'Selectool',
		file: './dist/js/selectool.js',
	},
	plugins: [babel({babelHelpers: 'bundled'})]
};

const css = {
	input: './src/css/selectool.css',
	output: {
		file: './dist/css/selectool.css',
	},
	plugins: [
		postcss({
			extract: true,
			minimize: false,
			plugins: [autoprefixer()],
			sourceMap: false,
		}),
	],
}

export default [umd, esm, css];