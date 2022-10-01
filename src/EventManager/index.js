export default class EventManager {
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