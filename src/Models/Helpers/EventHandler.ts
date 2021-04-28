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
		createCbFunc(type: string) {
			return (event: Event) =>
				this.events.get(type).forEach((func) => func(event));
		},
		addEvent(type: string, eventFn: (e: Event) => void) {
			const cb = this.createCbFunc(type);

			if (!this.events.has(type)) {
				this.events.set(type, new Set([eventFn]));
				this.element.addEventListener(type, cb);
			} else this.events.get(type).add(eventFn);
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
