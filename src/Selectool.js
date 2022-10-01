import Base from "./core/Base";
import Renderer from "./Renderer/Renderer";

export default class Selectool extends Base {
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