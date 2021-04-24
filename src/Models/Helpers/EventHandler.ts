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
		addEvent(type: string, eventFn: (e: Event) => void) {
			const cb = (event: Event) => {
				eventFn(event);
			};
			if (!this.events.has(type)) this.events.set(type, [cb]);
			else this.events.get(type).push(cb);
			this.element.addEventListener(type, cb);
		},
		clearAllEvents() {
			this.events.clear();
		},
	},
	propertyDescriptors: {
		name: { value: "event-handler" },
	},
});
