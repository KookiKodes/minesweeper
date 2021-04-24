import stamp from "tp-stampit";
import { EventHandler } from "./EventHandler";

export const Cell = stamp(EventHandler, {
	props: {
		value: null,
		element: "div",
		index: 0,
	},
	init({ value = this.value, size = this.size, index = this.index }) {
		this.value = value;
		this.index = index;
		this.appendElem(this.value);
		this.addAttr(["id", `${this.name}-${this.index}`]);

		if (typeof size === "number") size = size + "px";
		this.style({ width: size, height: size });
	},
	propertyDescriptors: {
		name: { value: "cell" },
	},
});
