'use strict';

const instance = new Selectool({
	select: '#selectool',
	on: {
		init() {
			console.log('init');
		},
		open() {
			console.log('open');
		},
		close() {
			console.log('close');
		},
		changeValue () {
			console.log('changeValue');
		},
		destroy() {
			console.log('destroy');
		}
	}
});

console.log(instance);