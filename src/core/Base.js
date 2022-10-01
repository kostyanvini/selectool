import EventManager from "../EventManager/index";

export default class Base {
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