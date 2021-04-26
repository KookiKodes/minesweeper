import stamp from "tp-stampit";
import { Text } from "../View/Text";

export const Timer = stamp(Text, {
	props: {
		value: 0,
		timerRef: null,
		timerPadding: 0,
	},
	init({ timerPadding = this.timerPadding }) {
		this.timerPadding = timerPadding;
		this.update();
	},
	methods: {
		start() {
			if (!this.timerRef) {
				this.timerRef = setInterval(() => {
					this.value++;
					this.update();
				}, 1000);
			}
		},
		stop() {
			if (this.timerRef) {
				clearInterval(this.timerRef);
				this.timerRef = null;
				this.update();
			}
		},
		reset() {
			if (this.timerRef) {
				clearInterval(this.timerRef);
			}
			this.timerRef = null;
			this.value = 0;
			this.update();
		},
		update() {
			this.addText(this.value.toString().padStart(this.timerPadding, "0"));
		},
	},
	propertyDescriptors: {
		name: { value: "timer" },
	},
});
