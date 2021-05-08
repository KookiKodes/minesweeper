import stamp from "tp-stampit";
import { ElementHandler } from "../View/ElementHandler";

export const EventHandler = stamp(ElementHandler, {
	props: {
		events: null,
	},
	init() {
		this.events = new Map();
	},
	methods: {
		createEventFunction(type: string) {
			return (event: Event) =>
				this.events.get(type).forEach((func) => func(event));
		},
		createCustomCb(type, cb, options: { once: boolean }) {
			const customCb = (event: Event) => {
				cb(event);
				if (options && options.once) this.events.get(type).delete(customCb);
			};
			return customCb;
		},
		addEvent(
			type: string,
			eventFn: (e: Event) => void,
			options: { once: boolean } = { once: false }
		) {
			const eventQueueFunc = this.createEventFunction(type);
			const customCb = this.createCustomCb(type, eventFn, options);

			if (!this.events.has(type)) {
				this.events.set(type, new Set([eventFn]));
				this.element.addEventListener(type, eventQueueFunc);
			} else this.events.get(type).add(customCb);
		},
		clearAllEvents() {
			this.events.clear();
		},
		copyAllEvents(stamp) {
			stamp.events.forEach((value, key) => {
				if (value instanceof Set) {
					value.forEach((event) => {
						this.addEvent(key, event);
					});
				} else this.addEvent(key, value);
			});
		},
	},
	propertyDescriptors: {
		name: { value: "event-handler" },
	},
});
