import stamp from "tp-stampit";
import { ElementHandler } from "./ElementHandler";
import { Instance } from "../Helpers/Instance";

export const Svg = stamp(ElementHandler, Instance, {
	props: {
		element: "template",
		name: "svg",
		htmlString: "",
	},
	init({ name = this.name, htmlString = this.htmlString }) {
		this.name = name;
		this.htmlString = "";

		this.element.innerHTML = htmlString;
		this.element = this.element.content.firstChild;
		this.addAttr(["data-name", this.name]);
	},
	propertyDescriptors: {
		name: { value: "svg" },
	},
});
