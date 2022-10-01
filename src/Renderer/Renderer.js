export default class Renderer {
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