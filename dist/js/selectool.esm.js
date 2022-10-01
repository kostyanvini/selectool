class EventManager {
	events = {};

	dispatch(evName, context) {
		if (!evName) {
			console.warn('[Selectool]: Error event name is required parameter');
		}
		if (this.events[evName]) {
			this.events[evName].forEach(ev => {
				ev.call(context, this);
			});
		}
		return this;
	}

	on(evName, cb) {
		if (!cb && typeof cb !== "function") {
			console.warn('[Selectool]: Error callback is required parameter');
			return this;
		}
		if (this.events.hasOwnProperty(evName)) {
			this.events[evName].push(cb);
		} else {
			this.events[evName] = [cb];
		}
		return this;
	}

	off(evName, cb) {
		if (this.events[evName]) {
			delete this.events[evName];
		}
		return this;
	}
}

class Base {
	em = new EventManager();

	on(evName, cb) {
		this.em.on(evName, cb);
	}

	off(evName, cb) {
		this.em.off(evName, cb);
	}

	dispatch(evName) {
		this.em.dispatch(evName, this);
	}

	getSelect(selector) {
		if (!selector) {
			throw new Error('[Selectool]: selector is required');
		}
		if (selector instanceof HTMLElement) {
			return selector;
		}
		const select = document.querySelector(selector);
		if (!select) {
			throw new Error('[Selectool]: selector is required');
		} else {
			return select;
		}
	}
}

class Renderer {
	static create(element = 'div', content = '', attrs = {}, events = {}) {
		const _element = document.createElement(element);

		if (typeof content === 'string') {
			_element.innerHTML = content;
		} else if (content instanceof HTMLElement) {
			_element.append(content);
		}

		if (Object.keys(attrs).length) {
			for (const attr in attrs) {
				_element.setAttribute(attr, attrs[attr]);
			}
		}

		if (Object.keys(events).length) {
			for (const event in events) {
				events[event].forEach(ev => {
					_element.addEventListener(event, ev);
				});
			}
		}
		return _element;
	}
}

class Selectool extends Base {
	originalParams = {
		on: {
			init: null,
			open: null,
			close: null,
			destroy: null
		}
	}

	constructor(params) {
		super();

		this.params = {...this.originalParams, ...params};
		this.domselect = this.getSelect(this.params.select);
		this.options = this.domselect.options;
		this.init();
	}

	init() {
		this.domselect.setAttribute('data-selectool', '');
		this.render();
		this.initEvents();
		this.dispatch('init');
	}

	initEvents() {
		for (const eventKey in this.params.on) {
			this.on(eventKey, this.params.on[eventKey]);
		}
	}

	destroyEvents() {
		for (const eventKey in this.params.on) {
			this.off(eventKey, this.params.on[eventKey]);
		}
	}

	render() {
		const wrap = Renderer.create('div', '', {'class': 'selectool'});
		const currentOption = this.getCurrentOption();

		wrap.insertAdjacentElement('afterbegin', this.getOptions());
		wrap.insertAdjacentElement('afterbegin', currentOption);

		this.currentOption = currentOption;
		this.select = wrap;

		this.domselect.insertAdjacentElement('afterend', wrap);
	}

	getCurrentOption() {
		let option = Array.from(this.options).find(opt => opt.getAttribute('selected'));
		if (!option) {
			return Renderer.create('div',
				this.options[0].textContent,
				{
					'class': 'selectool__current',
					'data-selected': ''
				},
				{
					'click': [() => this.toggle()]
				}
			);
		} else {
			return option;
		}
	}

	getOptions() {
		let wrap = Renderer.create('div', '', {'class': 'selectool__options'});
		let options = Array.from(this.options);

		options.forEach((option, index) => {
			let opt = Renderer.create('div',
				option.textContent,
				{
					'class': 'selectool__option ' + (option.disabled ? "is-disabled" : ""),
				},
				{
					'click': [
						() => {
							this.setValue(index, option.textContent, option.disabled);
							if (!option.disabled) {
								this.close();
							}
						}
					]
				}
			);
			wrap.append(opt);
		});
		return wrap;
	}

	toggle() {
		if (this.select.classList.contains('_open')) {
			this.close();
		} else {
			this.open();
		}
	}

	close() {
		this.select.classList.remove('_open');
		this.dispatch('close');
	}

	open() {
		this.select.classList.add('_open');
		this.dispatch('open');
	}

	setValue(index, text, disabled = false) {
		if (disabled) {
			return;
		}
		this.domselect.selectedIndex = index;
		this.currentOption.textContent = text || '';
		this.dispatch('changeValue');
	}

	destroy() {
		if (!this.domselect || !this.select) {
			return console.warn('[Selectool]: The instance has already been destroyed');
		}
		this.domselect.removeAttribute('data-selectool');

		this.destroyEvents();

		this.select.remove();
		this.domselect.remove();

		this.domselect = undefined;
		this.select = undefined;

		this.dispatch('destroy');
		return null;
	}
}

export { Selectool as default };
