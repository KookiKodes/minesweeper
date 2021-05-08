import stamp from "tp-stampit";
import { Text } from "../View/Text";
import { Button } from "../View/Button";
import { Svg } from "../View/Svg";
import { Container } from "./Container";
import { EventHandler } from "./EventHandler";

export const Modal = stamp(EventHandler, {
	props: {
		header: null,
		body: null,
		footer: null,
		element: "div",
	},
	init({
		header = this.header,
		footer = this.footer,
		closeBtnValue = "Close",
	}) {
		this.header = Text({
			value: header,
			element: "h1",
			className: "modal-header",
		});

		const closeBtn = Button({ value: Text({ value: "Close" }) });

		if (footer) {
			footer = [footer, closeBtn];
		} else footer = [closeBtn];
		this.footer = Container({ values: footer });

		this.appendElem(this.header, this.footer);
	},
	methods: {},
	propertyDescriptors: {
		name: { value: "modal" },
	},
});
