import stamp from "tp-stampit";
import { ElementHandler } from "../View/ElementHandler";

export const Container = stamp(ElementHandler, {
	props: {
		element: "div",
		values: null,
	},
	init({ values = this.values }) {
		this.values = values;
		this.appendElem(...this.values);
	},
	propertyDescriptors: {
		name: { value: "container" },
	},
});
