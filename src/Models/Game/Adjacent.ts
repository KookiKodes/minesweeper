import stamp from "tp-stampit";
import { Incrementor } from "../Helpers/Incrementor";

export const Adjacent = stamp(Incrementor, {
	props: {
		element: "p",
		value: 0,
	},
	init() {
		this.remText();
	},
	methods: {
		update() {
			this.setColor();
			this.addText(this.value);
		},
		setColor() {
			const colors = [
				"none",
				"blue",
				"green",
				"red",
				"darkblue",
				"darkred",
				"teal",
				"black",
				"grey",
			];
			this.style({ color: colors[this.value] });
		},
	},
	propertyDescriptors: {
		name: { value: "adjacent" },
	},
});
