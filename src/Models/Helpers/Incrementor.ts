import stamp from "tp-stampit";
import { Text } from "../View/Text";

export const Incrementor = stamp(Text, {
	props: {
		element: "p",
		value: 0,
	},
	init({ padding = 0 }) {
		this.update = this.update.bind(this, padding);
		this.update();
	},
	methods: {
		increment() {
			this.value += 1;
			this.update();
		},
		decrement() {
			this.value -= 1;
			this.update();
		},
		update(padding = 0) {
			this.addText(this.value.toString().padStart(padding, "0"));
		},
	},
	propertyDescriptors: {
		name: { value: "incementor" },
	},
});
