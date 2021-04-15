import stamp from "tp-stampit";
import { ElementHandler } from "./ElementHandler";
import { Instance } from "../Helpers/Instance";

export const Text = stamp(ElementHandler, Instance, {
	props: {
		element: "p",
		value: "",
		name: "text",
	},
	init({ value = this.value }) {
		this.text = value;
		this.addText(value);
	},
});
