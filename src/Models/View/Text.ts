import stamp from "tp-stampit";
import { ElementHandler } from "./ElementHandler";

export const Text = stamp(ElementHandler, {
	props: {
		element: "p",
		value: "",
		name: "text",
	},
	init({ value = this.value }) {
		this.value = value;
		this.addText(value);
	},
	propertyDescriptors: {
		name: { value: "text" },
	},
});
