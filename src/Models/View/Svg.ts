import stamp from "tp-stampit";
import { ElementHandler } from "./ElementHandler";

export const Svg = stamp(ElementHandler, {
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
