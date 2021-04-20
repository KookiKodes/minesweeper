import stamp from "tp-stampit";
import { EventHandler } from "./EventHandler";
import { Instance } from "./Instance";

export const Cell = stamp(EventHandler, Instance, {
	props: {
		value: null,
		element: "div",
	},
	init({ value = this.value, size = this.size }) {
		this.value = value;
		this.appendElem(this.value);
		this.addAttr(["id", `${this.name}-${this.instanceIndex}`]);

		if (typeof size === "number") size = size + "px";
		this.style({ width: size, height: size });
	},
	propertyDescriptors: {
		name: { value: "cell" },
	},
});
